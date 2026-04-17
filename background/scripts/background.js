import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../../src/lib/storage-vault';
import { savePreview } from '../../src/lib/dexie-store';
import { STORAGE_KEYS } from '../../src/lib/constants';
class DebugLogger {
    logs = [];
    log(msg, ...args) {
        const line = `[${new Date().toISOString()}] [VaultAuth-Debug] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.log(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
    }
    warn(msg, ...args) {
        const line = `[${new Date().toISOString()}] [VaultAuth-Warn] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.warn(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
    }
    error(msg, ...args) {
        const line = `[${new Date().toISOString()}] [VaultAuth-Error] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.error(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
    }
    async downloadLogFile() {
        const blob = new Blob([this.logs.join('\n')], { type: 'text/plain' });
        const objUrl = URL.createObjectURL(blob);
        await browser.downloads.download({ url: objUrl, filename: `vault_central_debug_${Date.now()}.log` });
        URL.revokeObjectURL(objUrl);
    }
}
const logger = new DebugLogger();
// ─── Network Intercept Scoring ──────────────────────────────────────────────
// Higher score = more desirable source. We strongly prefer HLS master playlists
// and direct mp4/webm files over everything else.
function scoreNetworkUrl(url) {
    const low = url.toLowerCase();
    // Master m3u8 (contains "master" or is the first m3u8 hit)
    if (low.includes('.m3u8') && (low.includes('master') || low.includes('playlist')))
        return 1000;
    // Any m3u8
    if (low.includes('.m3u8'))
        return 900;
    // Direct video files
    if (/\.(mp4)(\?|$)/.test(low))
        return 800;
    if (/\.(webm)(\?|$)/.test(low))
        return 700;
    if (/\.(flv|mkv|mov|avi|wmv)(\?|$)/.test(low))
        return 600;
    // MPEG-DASH manifests
    if (low.includes('.mpd'))
        return 850;
    // TS segments are low priority (we want the manifest, not chunks)
    if (/\.(ts)(\?|$)/.test(low) && !low.includes('.m3u8'))
        return 100;
    return 0;
}
// ─── Silent Tab Extraction ──────────────────────────────────────────────────
// Opens the target URL in a truly hidden, muted tab inside a minimised window.
// Simultaneously intercepts network requests (for m3u8/mp4) and injects a
// scraper script that aggressively extracts the main video source + metadata.
async function doTabExtraction(targetUrl) {
    logger.log("[doTabExtraction] Starting silent extraction for:", targetUrl);
    let scraperTabId;
    let scraperWindowId;
    let ownWindow = false; // did we create a dedicated window?
    let webRequestListener = null;
    let tabUpdateListener = null;
    let globalTimeoutId = null;
    const defaultMetadata = {
        title: "", thumbnail: "", duration: 0, author: "", views: "",
        tags: [], likes: "", date: "", description: "", actors: [], quality: ""
    };
    return new Promise(async (resolve) => {
        let isResolved = false;
        // Collected network-intercepted URLs, scored
        const interceptedUrls = [];
        let injectionStarted = false;
        // ── Cleanup helper ──────────────────────────────────────────────
        const cleanup = async (result, reason) => {
            if (isResolved)
                return;
            isResolved = true;
            logger.log(`[doTabExtraction] Cleanup. reason="${reason}" src=${result?.src ?? 'null'} thumb=${result?.metadata?.thumbnail?.length ?? 0}`);
            if (globalTimeoutId)
                clearTimeout(globalTimeoutId);
            if (webRequestListener && browser.webRequest) {
                try {
                    browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
                }
                catch (_) { }
            }
            if (tabUpdateListener) {
                try {
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                }
                catch (_) { }
            }
            // Close scraper tab/window
            if (ownWindow && scraperWindowId !== undefined) {
                try {
                    await browser.windows.remove(scraperWindowId);
                }
                catch (_) { }
            }
            else if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.remove(scraperTabId);
                }
                catch (_) { }
            }
            resolve(result);
        };
        // Helper: best intercepted URL so far
        const bestIntercepted = () => {
            if (interceptedUrls.length === 0)
                return null;
            interceptedUrls.sort((a, b) => b.score - a.score);
            return interceptedUrls[0].url;
        };
        try {
            // ── Step 1: Create a silent, minimised window ───────────────
            // Strategy: create a new minimised window with the target URL.
            // This is truly "hidden" — no visible flash. The tab inside loads
            // normally because Chromium doesn't throttle minimised windows the
            // same way it does inactive tabs.
            //
            // Fallback: if windows.create fails (Firefox Android, etc.), fall
            // back to creating a background tab in the current window and
            // immediately switching focus back.
            let scraperTab;
            try {
                const win = await browser.windows.create({
                    url: targetUrl,
                    state: 'minimized',
                    focused: false,
                    type: 'normal',
                });
                scraperTab = win.tabs[0];
                scraperWindowId = win.id;
                ownWindow = true;
                logger.log("[doTabExtraction] Created minimised window. winId:", win.id, "tabId:", scraperTab.id);
            }
            catch (winErr) {
                logger.warn("[doTabExtraction] windows.create failed, falling back to tab:", winErr);
                const queryTabs = await browser.tabs.query({ active: true, currentWindow: true });
                const prevActiveTabId = queryTabs[0]?.id;
                scraperTab = await browser.tabs.create({ url: targetUrl, active: true });
                scraperWindowId = scraperTab.windowId;
                // Flip focus back immediately
                if (prevActiveTabId && scraperTab.id !== prevActiveTabId) {
                    setTimeout(async () => {
                        try {
                            await browser.tabs.update(prevActiveTabId, { active: true });
                        }
                        catch (_) { }
                    }, 50);
                }
            }
            scraperTabId = scraperTab.id;
            // Mute the tab to prevent any audio
            if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.update(scraperTabId, { muted: true });
                }
                catch (_) { }
            }
            // ── Step 2: Global timeout ──────────────────────────────────
            globalTimeoutId = setTimeout(() => {
                const best = bestIntercepted();
                logger.warn("[doTabExtraction] Timeout (30s). bestIntercepted:", best);
                cleanup(best ? { src: best, metadata: defaultMetadata } : null, "Timeout");
            }, 30000);
            // ── Step 3: Network interception ────────────────────────────
            if (browser.webRequest) {
                webRequestListener = (details) => {
                    if (details.tabId !== scraperTabId)
                        return;
                    const score = scoreNetworkUrl(details.url);
                    if (score > 0) {
                        logger.log("[doTabExtraction] Network intercept:", details.url.substring(0, 120), "score:", score);
                        interceptedUrls.push({ url: details.url, score });
                    }
                };
                browser.webRequest.onBeforeRequest.addListener(webRequestListener, { urls: ["<all_urls>"], tabId: scraperTabId });
                logger.log("[doTabExtraction] webRequest listener attached for tabId:", scraperTabId);
            }
            // ── Step 4: Define the scraper injection function ────────────
            const injectScraper = async () => {
                if (injectionStarted || isResolved || scraperTabId === undefined)
                    return;
                injectionStarted = true;
                logger.log("[doTabExtraction] Injecting scraper into tabId:", scraperTabId);
                try {
                    const results = await browser.scripting.executeScript({
                        target: { tabId: scraperTabId },
                        func: async () => {
                            // ═══════════════════════════════════════════
                            // INJECTED SCRAPER — runs in the video page
                            // ═══════════════════════════════════════════
                            const _delay = (ms) => new Promise(r => setTimeout(r, ms));
                            // ── Metadata helpers ────────────────────
                            const getMeta = (prop, name) => {
                                const selectors = [`meta[property="${prop}"]`];
                                if (name)
                                    selectors.push(`meta[name="${name}"]`);
                                for (const sel of selectors) {
                                    const el = document.querySelector(sel);
                                    if (el)
                                        return el.content || "";
                                }
                                return "";
                            };
                            const getTextFrom = (...selectors) => {
                                for (const sel of selectors) {
                                    try {
                                        const el = document.querySelector(sel);
                                        if (el && el.textContent)
                                            return el.textContent.trim().replace(/\s+/g, ' ');
                                    }
                                    catch (_) { }
                                }
                                return "";
                            };
                            const getAllText = (...selectors) => {
                                const results = [];
                                for (const sel of selectors) {
                                    try {
                                        document.querySelectorAll(sel).forEach(el => {
                                            const t = el.textContent?.trim();
                                            if (t)
                                                results.push(t);
                                        });
                                    }
                                    catch (_) { }
                                }
                                return results;
                            };
                            // ── LD+JSON extraction ──────────────────
                            const parseLdJson = () => {
                                const scripts = document.querySelectorAll('script[type="application/ld+json"]');
                                for (const s of Array.from(scripts)) {
                                    try {
                                        const data = JSON.parse(s.textContent || '');
                                        // Can be an array or single object
                                        const items = Array.isArray(data) ? data : [data];
                                        for (const item of items) {
                                            if (item['@type'] === 'VideoObject' || item['@type'] === 'Movie' || item['@type'] === 'Clip')
                                                return item;
                                            // Check nested
                                            if (item.video && typeof item.video === 'object')
                                                return item.video;
                                            if (item.mainEntity && typeof item.mainEntity === 'object')
                                                return item.mainEntity;
                                        }
                                    }
                                    catch (_) { }
                                }
                                return {};
                            };
                            // ── Click play buttons / activate players ──
                            const activatePlayers = async () => {
                                const selectors = [
                                    '.vjs-big-play-button', '.ytp-large-play-button',
                                    'button[aria-label*="Play"]', 'button[aria-label*="play"]',
                                    'button[title*="Play"]', 'button[title*="play"]',
                                    '[class*="play-button"]', '[class*="play_button"]',
                                    '[class*="playBtn"]', '[class*="play-btn"]',
                                    '.fp-play', '.mhp-play', '.plyr__control--overlaid',
                                    '[data-plyr="play"]',
                                ];
                                for (const sel of selectors) {
                                    try {
                                        const els = document.querySelectorAll(sel);
                                        for (const el of Array.from(els)) {
                                            el.click();
                                            await _delay(300);
                                        }
                                    }
                                    catch (_) { }
                                }
                                // Also try playing any video element directly
                                document.querySelectorAll('video').forEach(v => {
                                    v.muted = true;
                                    v.play().catch(() => { });
                                });
                            };
                            // ── Capture JPEG frame ──────────────────
                            const captureFrame = async (video) => {
                                try {
                                    video.muted = true;
                                    // Seek to ~10% of duration for a better frame
                                    if (video.duration && isFinite(video.duration) && video.duration > 5) {
                                        video.currentTime = Math.min(video.duration * 0.1, 30);
                                    }
                                    else if (video.currentTime === 0) {
                                        video.currentTime = 3;
                                    }
                                    await new Promise((resolve) => {
                                        const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve(); };
                                        video.addEventListener('seeked', onSeeked);
                                        setTimeout(() => resolve(), 2000);
                                    });
                                    await _delay(500);
                                    const canvas = document.createElement('canvas');
                                    canvas.width = video.videoWidth || 640;
                                    canvas.height = video.videoHeight || 360;
                                    const ctx = canvas.getContext('2d');
                                    if (!ctx)
                                        return null;
                                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    return canvas.toDataURL('image/jpeg', 0.65);
                                }
                                catch (_) {
                                    return null;
                                }
                            };
                            // ── Find the main video element ─────────
                            const findMainVideo = () => {
                                const videos = Array.from(document.querySelectorAll('video'));
                                if (videos.length === 0)
                                    return { src: null, el: null };
                                let bestEl = null;
                                let bestSrc = null;
                                let bestScore = -1;
                                for (const v of videos) {
                                    const rect = v.getBoundingClientRect();
                                    let score = rect.width * rect.height;
                                    const idClass = (v.id + ' ' + v.className + ' ' + (v.closest('[class]')?.className || '')).toLowerCase();
                                    // Boost known player patterns
                                    if (/player|main|primary|hero|video-js|vjs|jwplayer|fp-engine|html5-main/.test(idClass))
                                        score += 2_000_000;
                                    // Boost if it has a src and is playing or has loaded
                                    if (v.readyState >= 2)
                                        score += 500_000;
                                    if (!v.paused)
                                        score += 500_000;
                                    // Penalise tiny preview/ad players
                                    if (rect.width < 200 || rect.height < 150)
                                        score -= 1_000_000;
                                    // Try to get a direct (non-blob) src
                                    let src = null;
                                    if (v.src && !v.src.startsWith('blob:')) {
                                        src = v.src;
                                    }
                                    else {
                                        const sources = Array.from(v.querySelectorAll('source'));
                                        for (const s of sources) {
                                            if (s.src && !s.src.startsWith('blob:')) {
                                                src = s.src;
                                                break;
                                            }
                                        }
                                    }
                                    if (score > bestScore) {
                                        bestScore = score;
                                        bestEl = v;
                                        bestSrc = src;
                                    }
                                }
                                return { src: bestSrc, el: bestEl };
                            };
                            // ── Parse time strings ──────────────────
                            const parseTime = (s) => {
                                if (!s)
                                    return 0;
                                // "PT1H2M3S" ISO 8601 duration
                                const iso = s.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
                                if (iso)
                                    return (parseInt(iso[1] || '0')) * 3600 + (parseInt(iso[2] || '0')) * 60 + (parseInt(iso[3] || '0'));
                                // "1:23:45" or "23:45"
                                const parts = s.match(/(\d+):(\d{2})(?::(\d{2}))?/);
                                if (!parts)
                                    return parseFloat(s) || 0;
                                if (parts[3])
                                    return parseInt(parts[1]) * 3600 + parseInt(parts[2]) * 60 + parseInt(parts[3]);
                                return parseInt(parts[1]) * 60 + parseInt(parts[2]);
                            };
                            // ═══════════════════════════════════════
                            // MAIN EXTRACTION LOGIC
                            // ═══════════════════════════════════════
                            // Phase 1: Activate any lazy players
                            await activatePlayers();
                            await _delay(2000);
                            // Phase 2: LD+JSON structured data
                            const ld = parseLdJson();
                            // Phase 3: Aggressive metadata collection
                            const meta = {
                                title: "",
                                thumbnail: "",
                                duration: 0,
                                author: "",
                                views: "",
                                tags: [],
                                likes: "",
                                date: "",
                                description: "",
                                actors: [],
                                quality: "",
                            };
                            // Title: LD+JSON > og:title > <title>
                            meta.title = ld.name || ld.headline
                                || getMeta("og:title", "title")
                                || getMeta("twitter:title")
                                || getTextFrom('h1', 'h2.title', '.video-title', '[class*="title"]')
                                || document.title || "";
                            // Description
                            meta.description = ld.description
                                || getMeta("og:description", "description")
                                || getMeta("twitter:description")
                                || getTextFrom('.video-description', '[class*="description"]', '.desc')
                                || "";
                            // Author / uploader / channel
                            meta.author = (typeof ld.author === 'object' ? ld.author?.name : ld.author)
                                || ld.uploadedBy || ld.creator
                                || getMeta("og:site_name", "author")
                                || getMeta("article:author")
                                || getTextFrom('.channel-name', '.uploader', '.username', '.author', '[class*="channel"]', '[class*="uploader"]', '[class*="author"]', '[class*="user-name"]', '[class*="username"]', 'a[href*="/channel/"]', 'a[href*="/user/"]', 'a[href*="/model/"]', 'a[href*="/pornstar/"]', '.video-info .name', '.owner a')
                                || "";
                            // Thumbnail: og:image > LD+JSON > we'll capture later
                            meta.thumbnail = getMeta("og:image", "image")
                                || getMeta("twitter:image")
                                || ld.thumbnailUrl
                                || (Array.isArray(ld.thumbnail) ? ld.thumbnail[0]?.url : ld.thumbnail?.url)
                                || "";
                            // Duration
                            if (ld.duration)
                                meta.duration = parseTime(String(ld.duration));
                            if (!meta.duration) {
                                const ogDur = getMeta("video:duration");
                                if (ogDur)
                                    meta.duration = parseFloat(ogDur) || 0;
                            }
                            // Views
                            meta.views = String(ld.interactionCount || ld.viewCount || "")
                                || getTextFrom('.views', '[class*="views"]', '[class*="view-count"]', '.video-views', '.cnt-number')
                                || "";
                            // Likes
                            meta.likes = getTextFrom('.likes', '[class*="likes"]', '[class*="like-count"]', '.rating-likes', '.vote-count', '[class*="thumb-up"] + *') || "";
                            // Tags / categories
                            const ogTags = getMeta("og:video:tag", "keywords");
                            const ldTags = Array.isArray(ld.keywords) ? ld.keywords : (typeof ld.keywords === 'string' ? ld.keywords.split(',') : []);
                            const domTags = getAllText('.tag a', '.tags a', '[class*="tag-list"] a', '[class*="categories"] a', '.category a');
                            meta.tags = [...new Set([
                                    ...ldTags.map((t) => t.trim()),
                                    ...(ogTags ? ogTags.split(',').map(s => s.trim()) : []),
                                    ...domTags,
                                ])].filter(Boolean);
                            // Date
                            meta.date = ld.datePublished || ld.uploadDate
                                || getMeta("article:published_time")
                                || getMeta("og:updated_time")
                                || getTextFrom('.date', '[class*="date"]', 'time', '[datetime]')
                                || "";
                            // Actors / performers (adult/movie sites)
                            const ldActors = Array.isArray(ld.actor) ? ld.actor.map((a) => typeof a === 'object' ? a.name : a) : [];
                            const domActors = getAllText('.pornstar a', '.model a', '.actor a', '[class*="pornstar"] a', '[class*="model"] a', '[class*="performer"] a', '.cast a');
                            meta.actors = [...new Set([...ldActors, ...domActors])].filter(Boolean);
                            // Quality / resolution
                            meta.quality = getTextFrom('.quality', '[class*="quality"]', '[class*="resolution"]', '.hd-label', '.quality-badge') || "";
                            // Phase 4: Find the main video + capture frame
                            let { src: bestSrc, el: bestEl } = findMainVideo();
                            // If no video yet, wait a bit more and retry
                            if (!bestEl) {
                                await _delay(3000);
                                await activatePlayers();
                                await _delay(2000);
                                const retry = findMainVideo();
                                bestSrc = retry.src;
                                bestEl = retry.el;
                            }
                            // Get duration from the video element if we don't have it yet
                            if (bestEl && (!meta.duration || meta.duration === 0)) {
                                if (bestEl.duration && isFinite(bestEl.duration)) {
                                    meta.duration = bestEl.duration;
                                }
                            }
                            // Capture a JPEG frame from the video (better than og:image)
                            if (bestEl) {
                                const frame = await captureFrame(bestEl);
                                if (frame)
                                    meta.thumbnail = frame;
                            }
                            return { src: bestSrc, metadata: meta };
                        }
                    });
                    const foundResult = results[0]?.result;
                    const bestNet = bestIntercepted();
                    logger.log("[doTabExtraction] Scraper done. domSrc:", foundResult?.src ?? 'null', "| networkBest:", bestNet?.substring(0, 80) ?? 'null', "| thumb:", foundResult?.metadata?.thumbnail?.length ?? 0);
                    // Merge: network-intercepted src takes priority (it's the real stream URL)
                    const finalResult = {
                        src: bestNet || foundResult?.src || null,
                        metadata: foundResult?.metadata ?? defaultMetadata,
                    };
                    // If no thumbnail from scraper, try captureTab/captureVisibleTab
                    if (!finalResult.metadata.thumbnail && scraperTabId !== undefined) {
                        try {
                            logger.log("[doTabExtraction] No thumbnail. Attempting captureTab fallback.");
                            await browser.tabs.update(scraperTabId, { active: true });
                            await new Promise(r => setTimeout(r, 600));
                            const captureTabFn = browser.tabs.captureTab;
                            const snap = captureTabFn
                                ? await captureTabFn(scraperTabId, { format: "jpeg", quality: 30 })
                                : await browser.tabs.captureVisibleTab(scraperWindowId, { format: "jpeg", quality: 30 });
                            if (snap)
                                finalResult.metadata.thumbnail = snap;
                        }
                        catch (e) {
                            logger.warn("[doTabExtraction] captureTab fallback failed:", e);
                        }
                    }
                    cleanup(finalResult, finalResult.src ? "Extraction success" : "No src found");
                }
                catch (e) {
                    logger.error("[doTabExtraction] Injection error:", e);
                    // Even on injection failure, we may have network-intercepted URLs
                    const best = bestIntercepted();
                    cleanup(best ? { src: best, metadata: defaultMetadata } : null, "Injection error (network fallback)");
                }
            };
            // ── Step 5: Wait for page load, then inject scraper ─────────
            tabUpdateListener = (tabId, info) => {
                if (tabId === scraperTabId && info.status === 'complete') {
                    if (tabUpdateListener) {
                        browser.tabs.onUpdated.removeListener(tabUpdateListener);
                        tabUpdateListener = null;
                    }
                    injectScraper();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);
            // Race-condition guard: tab may already be complete
            try {
                const tab = await browser.tabs.get(scraperTab.id);
                if (tab.status === 'complete') {
                    if (tabUpdateListener) {
                        browser.tabs.onUpdated.removeListener(tabUpdateListener);
                        tabUpdateListener = null;
                    }
                    injectScraper();
                }
            }
            catch (_) { }
        }
        catch (e) {
            logger.error("[doTabExtraction] Setup failed:", e);
            cleanup(null, "Setup failed");
        }
    });
}
async function openDashboard() {
    const url = browser.runtime.getURL('dashboard-v2.html');
    const tabs = await browser.tabs.query({});
    const { [STORAGE_KEYS.ACTIVE_TAB_ID]: storedTabId } = await browser.storage.local.get(STORAGE_KEYS.ACTIVE_TAB_ID);
    let dashboardTab = null;
    if (storedTabId) {
        dashboardTab = tabs.find(t => t.id === storedTabId && t.url?.startsWith(url));
    }
    if (!dashboardTab)
        dashboardTab = tabs.find(t => t.url?.startsWith(url));
    if (dashboardTab && dashboardTab.id) {
        await browser.tabs.update(dashboardTab.id, { active: true });
        if (dashboardTab.windowId)
            await browser.windows.update(dashboardTab.windowId, { focused: true });
    }
    else {
        const newTab = await browser.tabs.create({ url, active: true });
        if (newTab.id)
            await browser.storage.local.set({ [STORAGE_KEYS.ACTIVE_TAB_ID]: newTab.id });
    }
}
async function runCapturePipeline(data, tabId, windowId) {
    logger.log("[runCapturePipeline] Received. url:", data.url, "| thumb:", !!data.thumbnail, "(len:", data.thumbnail?.length ?? 0, ")");
    try {
        const pageUrl = data.url; // The video page URL (for deduplication)
        let finalSrc = data.url; // Will become the playable link (m3u8/mp4)
        // ── Fallback screenshot if no thumbnail from content script ──
        if (!data.thumbnail && windowId) {
            try {
                data.thumbnail = await browser.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 20 });
                logger.log("[runCapturePipeline] captureVisibleTab fallback. len:", data.thumbnail?.length ?? 0);
            }
            catch (e) {
                logger.warn("[runCapturePipeline] captureVisibleTab failed:", e);
            }
        }
        // ── Silent tab extraction ────────────────────────────────────
        logger.log("[runCapturePipeline] Starting doTabExtraction for:", pageUrl);
        const extracted = await doTabExtraction(pageUrl);
        logger.log("[runCapturePipeline] doTabExtraction result. src:", extracted?.src?.substring(0, 80) ?? 'null', "| thumb:", extracted?.metadata?.thumbnail?.length ?? 0);
        if (extracted) {
            // The extracted src is the REAL playable video link (m3u8/mp4)
            if (extracted.src)
                finalSrc = extracted.src;
            // ── Aggressive metadata merge ────────────────────────────
            // Strategy: scraped data from the video page is almost always better
            // than what the content script pulled from a thumbnail card. Merge
            // aggressively — prefer scraped values, fall back to content-script.
            const m = extracted.metadata;
            if (m.title)
                data.title = m.title;
            if (m.author)
                data.author = m.author;
            if (m.duration)
                data.duration = m.duration;
            if (m.views)
                data.views = m.views;
            if (m.likes)
                data.likes = m.likes;
            if (m.date)
                data.date = m.date;
            if (m.description)
                data.description = m.description;
            if (m.quality)
                data.quality = m.quality;
            // Thumbnail: prefer scraped (it comes from the actual video page)
            if (m.thumbnail) {
                logger.log("[runCapturePipeline] Using scraped thumbnail (len:", m.thumbnail.length, ")");
                data.thumbnail = m.thumbnail;
            }
            // Tags: merge (no duplicates)
            if (Array.isArray(m.tags) && m.tags.length > 0) {
                const existingTags = Array.isArray(data.tags) ? data.tags : [];
                data.tags = [...new Set([...existingTags, ...m.tags])].filter(Boolean);
            }
            // Actors: merge
            if (Array.isArray(m.actors) && m.actors.length > 0) {
                const existingActors = Array.isArray(data.actors) ? data.actors : [];
                data.actors = [...new Set([...existingActors, ...m.actors])].filter(Boolean);
            }
        }
        else {
            logger.warn("[runCapturePipeline] Extraction returned null. Keeping original URL:", pageUrl);
        }
        // ── Set rawVideoSrc (the playable link) ─────────────────────
        data.rawVideoSrc = finalSrc;
        // ── Determine media type from the playable link ─────────────
        const srcLower = finalSrc.toLowerCase();
        if (/\.(mp4|webm|mkv|flv|mov|avi|wmv)(\?|$)/.test(srcLower) || /\.m3u8(\?|$)/.test(srcLower) || /\.mpd(\?|$)/.test(srcLower)) {
            data.type = 'video';
        }
        else {
            // Keep whatever was set, or default to 'link'
            data.type = data.type || 'link';
        }
        // ── Extract domain from the page URL ────────────────────────
        try {
            data.domain = new URL(pageUrl).hostname.replace(/^www\./, '');
        }
        catch (_) {
            data.domain = data.domain || 'Unknown';
        }
        logger.log("[runCapturePipeline] Final: rawVideoSrc=", data.rawVideoSrc?.substring(0, 80), "| type=", data.type, "| domain=", data.domain, "| thumb len=", data.thumbnail?.length ?? 0);
        // ── Deduplication check ──────────────────────────────────────
        const saved = await getSavedVideos(true);
        if (saved.some(v => v.url === data.url)) {
            logger.warn("[runCapturePipeline] Already in vault. url:", data.url);
            return { success: false, message: "Item already in vault" };
        }
        // ── Save ─────────────────────────────────────────────────────
        data.timestamp = Date.now();
        data.dateSaved = Date.now();
        saved.push(data);
        await saveVideos(saved);
        logger.log("[runCapturePipeline] Saved! Vault size:", saved.length);
        // ── Background preview generation ────────────────────────────
        const thumbIsWebm = data.thumbnail?.startsWith('data:video');
        if (thumbIsWebm) {
            try {
                const base64Data = data.thumbnail.split(',')[1];
                const binaryString = atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++)
                    bytes[i] = binaryString.charCodeAt(i);
                await savePreview(data.url, new Blob([bytes], { type: 'video/webm' }));
                logger.log("[runCapturePipeline] Saved WebM preview to Dexie.");
            }
            catch (err) {
                logger.warn("[runCapturePipeline] WebM save failed:", err);
            }
        }
        if (data.rawVideoSrc && !thumbIsWebm) {
            setupOffscreenDocument().then(() => {
                browser.runtime.sendMessage({
                    action: "generate_preview",
                    data: { url: data.rawVideoSrc, duration: typeof data.duration === 'number' ? data.duration : 60 }
                }).catch(() => { });
            });
        }
        return { success: true, data };
    }
    catch (err) {
        logger.error("[runCapturePipeline] Error:", err);
        return { success: false, message: err.message };
    }
}
async function setupOffscreenDocument() {
    const offscreenUrl = 'src/offscreen/processor.html';
    logger.log("[setupOffscreenDocument] Setting up offscreen document:", offscreenUrl);
    if (!browser.offscreen) {
        logger.warn("[setupOffscreenDocument] browser.offscreen API not available. Attempting iframe fallback.");
        if (typeof document !== 'undefined' && document.body) {
            let frame = document.getElementById('vault-processor-frame');
            if (!frame) {
                logger.log("[setupOffscreenDocument] Creating fallback iframe processor.");
                frame = document.createElement('iframe');
                frame.id = 'vault-processor-frame';
                frame.src = browser.runtime.getURL(offscreenUrl);
                document.body.appendChild(frame);
                await new Promise((r) => frame.onload = r);
                logger.log("[setupOffscreenDocument] Fallback iframe loaded.");
            }
            else {
                logger.log("[setupOffscreenDocument] Fallback iframe already exists.");
            }
        }
        else {
            logger.warn("[setupOffscreenDocument] No document.body available for iframe fallback. Preview generation unavailable.");
        }
        return;
    }
    try {
        const contexts = await browser.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'], documentUrls: [browser.runtime.getURL(offscreenUrl)] });
        if (contexts && contexts.length > 0) {
            logger.log("[setupOffscreenDocument] Offscreen document already exists. Skipping creation.");
            return;
        }
        logger.log("[setupOffscreenDocument] Creating offscreen document...");
        await browser.offscreen.createDocument({
            url: offscreenUrl,
            reasons: ['DOM_PARSER', 'AUDIO_PLAYBACK', 'BLOBS'],
            justification: 'FFmpeg WASM processing for video previews'
        });
        logger.log("[setupOffscreenDocument] Offscreen document created.");
    }
    catch (e) {
        logger.error("[setupOffscreenDocument] Failed to create offscreen document:", e);
    }
}
browser.runtime.onMessage.addListener((request, sender) => {
    logger.log("[onMessage] Received action:", request.action, "| from tab:", sender?.tab?.id, "url:", sender?.tab?.url?.substring(0, 80));
    if (request.action === "extract_fresh_m3u8")
        return doTabExtraction(request.url).then(res => ({ src: res?.src || null }));
    if (request.action === "open_dashboard") {
        openDashboard();
        return Promise.resolve(true);
    }
    if (request.action === "process_capture")
        return runCapturePipeline(request.data, sender?.tab?.id, sender?.tab?.windowId);
    if (request.action === "generate_preview") {
        return setupOffscreenDocument().then(() => {
            browser.runtime.sendMessage(request).catch(() => { });
            return true;
        });
    }
    if (request.action === "download_debug_logs") {
        logger.downloadLogFile();
        return Promise.resolve(true);
    }
    logger.warn("[onMessage] Unknown action received:", request.action);
    return false;
});
browser.action.onClicked.addListener(() => {
    logger.log("[action.onClicked] Extension icon clicked. Opening dashboard.");
    openDashboard();
});
browser.commands.onCommand.addListener(async (command) => {
    logger.log("[commands.onCommand] Command received:", command);
    if (command === "_execute_action" || command === "open-dashboard") {
        openDashboard();
    }
    else if (command === "capture-video") {
        try {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const activeTab = tabs[0];
            logger.log("[commands.onCommand] capture-video. Active tab:", activeTab?.id, "url:", activeTab?.url?.substring(0, 80));
            if (!activeTab?.id || !activeTab.url || activeTab.url.startsWith('chrome:')) {
                logger.warn("[commands.onCommand] Cannot capture - no valid active tab.");
                return;
            }
            try {
                await browser.tabs.sendMessage(activeTab.id, { type: "capture-video" });
                logger.log("[commands.onCommand] Sent capture-video to content script.");
            }
            catch (error) {
                logger.warn("[commands.onCommand] Content script not available on tab. Showing alert.", error);
                try {
                    await browser.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        func: () => alert("[Vault Central] Extension script is not active on this page. Please refresh.")
                    });
                }
                catch (e) {
                    logger.error("[commands.onCommand] executeScript for alert also failed:", e);
                }
            }
        }
        catch (error) {
            logger.error("[commands.onCommand] Unexpected error handling capture-video command:", error);
        }
    }
});
