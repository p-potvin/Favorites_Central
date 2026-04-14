import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../../src/lib/storage-vault';
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
async function doTabExtraction(targetUrl) {
    logger.log("[doTabExtraction] Starting extraction for:", targetUrl);
    let scraperTabId = undefined;
    let webRequestListener = null;
    let tabUpdateListener = null;
    let globalTimeoutId = null;
    let scraperWindowId = undefined;
    return new Promise(async (resolve) => {
        let isResolved = false;
        let latestM3u8 = null;
        let injectionStarted = false;
        const defaultMetadata = { title: "", thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };
        logger.log("[doTabExtraction] defaultMetadata initialized (thumbnail will be empty unless scraped)");
        const cleanup = async (result, reason) => {
            if (isResolved)
                return;
            isResolved = true;
            logger.log(`[doTabExtraction] Cleanup triggered. Reason: ${reason}. TabID: ${scraperTabId}. Result src: ${result?.src ?? 'null'}. Thumbnail present: ${!!result?.metadata?.thumbnail}, thumbnail length: ${result?.metadata?.thumbnail?.length ?? 0}`);
            if (globalTimeoutId)
                clearTimeout(globalTimeoutId);
            if (webRequestListener && browser.webRequest) {
                try {
                    browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
                }
                catch (e) {
                    logger.warn("Error removing webRequest listener:", e);
                }
            }
            if (tabUpdateListener) {
                try {
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                }
                catch (e) {
                    logger.warn("[doTabExtraction] Error removing tabUpdateListener:", e);
                }
            }
            if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.remove(scraperTabId);
                }
                catch (e) { }
            }
            resolve(result);
        };
        try {
            // BUG FIX: Do NOT call browser.tabs.hide() on a newly-created tab.
            // Chrome's API explicitly states: "Tabs hidden since creation are never loaded."
            // Calling hide() immediately after create() suspends the tab before it can load,
            // so the tabUpdateListener waiting for status='complete' never fires, and
            // the 35s global timeout becomes the only exit — causing the user to see nothing
            // until they manually focus the tab (which resumes loading).
            // Creating with active: false is sufficient to avoid stealing focus without suspending the tab.
            const scraperTab = await browser.tabs.create({ url: targetUrl, active: false });
            logger.log("[doTabExtraction] Scraper tab created. tabId:", scraperTab.id, "windowId:", scraperTab.windowId, "| NOTE: NOT hiding tab — hiding a tab since creation prevents it from loading in Chrome.");
            scraperTabId = scraperTab.id;
            scraperWindowId = scraperTab.windowId;
            globalTimeoutId = setTimeout(() => {
                logger.warn("[doTabExtraction] Global timeout reached after 35s. latestM3u8:", latestM3u8);
                cleanup(latestM3u8 ? { src: latestM3u8, metadata: defaultMetadata } : null, "Timeout reached");
            }, 35000); // Extended timeout for WebM generation
            if (browser.webRequest) {
                webRequestListener = (details) => {
                    const lowercaseUrl = details.url.toLowerCase();
                    if (details.tabId === scraperTabId) {
                        const isStream = lowercaseUrl.includes('.m3u8') || lowercaseUrl.includes('manifest') || lowercaseUrl.includes('.ts');
                        const isDirectVideo = /\.(mp4|webm|flv|mkv|mov)(\?|$)/.test(lowercaseUrl);
                        if (isStream || isDirectVideo) {
                            logger.log("[doTabExtraction] Network intercept:", details.url, "| isStream:", isStream, "| isDirectVideo:", isDirectVideo);
                            if (!latestM3u8 || isStream)
                                latestM3u8 = details.url;
                        }
                    }
                };
                browser.webRequest.onBeforeRequest.addListener(webRequestListener, { urls: ["<all_urls>"], tabId: scraperTabId });
                logger.log("[doTabExtraction] webRequest listener attached for tabId:", scraperTabId);
            }
            else {
                logger.warn("[doTabExtraction] browser.webRequest is not available - network interception disabled.");
            }
            // BUG FIX (race condition): tabs.onUpdated listener is attached after tabs.create(),
            // so a page that loads instantly from cache can fire status='complete' before the
            // listener is registered and injectScript() would never be called.
            // Fix: attach the listener first, then also check the current tab status in case
            // the page already finished loading while we were setting up.
            tabUpdateListener = (tabId, info) => {
                if (tabId === scraperTabId && info.status === 'complete') {
                    logger.log("[doTabExtraction] Scraper tab loaded (status=complete) via onUpdated. Injecting script...");
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                    tabUpdateListener = null;
                    injectScript();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);
            // Check if the tab already reached 'complete' before our listener was attached
            // (can happen for cached pages or very fast redirects).
            browser.tabs.get(scraperTab.id).then(tab => {
                if (tab.status === 'complete') {
                    logger.log("[doTabExtraction] Tab was already 'complete' before listener attached (cache hit). Injecting immediately.");
                    if (tabUpdateListener) {
                        browser.tabs.onUpdated.removeListener(tabUpdateListener);
                        tabUpdateListener = null;
                    }
                    injectScript();
                }
                else {
                    logger.log("[doTabExtraction] Tab status on post-create check:", tab.status, "— waiting for onUpdated...");
                }
            }).catch(e => {
                logger.warn("[doTabExtraction] Could not check post-create tab status:", e);
            });
            const injectScript = async () => {
                if (injectionStarted || isResolved || scraperTabId === undefined) {
                    logger.warn("[doTabExtraction] injectScript called but skipped. injectionStarted:", injectionStarted, "isResolved:", isResolved, "scraperTabId:", scraperTabId);
                    return;
                }
                injectionStarted = true;
                logger.log("[doTabExtraction] Executing injection script in tabId:", scraperTabId);
                try {
                    const results = await browser.scripting.executeScript({
                        target: { tabId: scraperTabId },
                        func: async () => {
                            const delay = (ms) => new Promise(r => setTimeout(r, ms));
                            const captureWebMPreview = async (video) => {
                                try {
                                    video.muted = true;
                                    video.playsInline = true;
                                    const canvas = document.createElement('canvas');
                                    canvas.width = video.videoWidth || 640;
                                    canvas.height = video.videoHeight || 360;
                                    const ctx = canvas.getContext('2d');
                                    const stream = canvas.captureStream(20);
                                    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                                    const chunks = [];
                                    recorder.ondataavailable = e => { if (e.data.size > 0)
                                        chunks.push(e.data); };
                                    recorder.start();
                                    const duration = (video.duration && isFinite(video.duration) && video.duration > 0) ? video.duration : 60;
                                    const segments = 10;
                                    const segmentLength = 2000;
                                    for (let i = 0; i < segments; i++) {
                                        video.currentTime = (duration / segments) * i;
                                        await new Promise((r) => {
                                            const seeked = () => { video.removeEventListener('seeked', seeked); r(null); };
                                            video.addEventListener('seeked', seeked);
                                            setTimeout(r, 1000);
                                        });
                                        await video.play().catch(() => { });
                                        const start = Date.now();
                                        while (Date.now() - start < segmentLength) {
                                            if (ctx)
                                                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                            await delay(50); // Pump frames to bypass background throttle
                                        }
                                    }
                                    video.pause();
                                    recorder.stop();
                                    return await new Promise((resolve) => {
                                        recorder.onstop = () => {
                                            const blob = new Blob(chunks, { type: 'video/webm' });
                                            const reader = new FileReader();
                                            reader.onloadend = () => resolve(reader.result);
                                            reader.readAsDataURL(blob);
                                        };
                                    });
                                }
                                catch (e) {
                                    return null;
                                }
                            };
                            const captureJpegFrame = async (video) => {
                                try {
                                    if (video.currentTime === 0)
                                        video.currentTime = 5;
                                    await delay(800);
                                    const canvas = document.createElement('canvas');
                                    canvas.width = video.videoWidth || 640;
                                    canvas.height = video.videoHeight || 360;
                                    const ctx = canvas.getContext('2d');
                                    if (ctx) {
                                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                        return canvas.toDataURL('image/jpeg', 0.5);
                                    }
                                }
                                catch (e) {
                                    return null;
                                }
                                return null;
                            };
                            const clickAllPlayers = async () => {
                                const selectors = [
                                    'video', 'iframe', 'button[aria-label*="Play"]',
                                    '.vjs-big-play-button', '.ytp-large-play-button',
                                    '[class^="media-player"]', '[role="button"]'
                                ];
                                for (const selector of selectors) {
                                    try {
                                        const elements = document.querySelectorAll(selector);
                                        for (const el of Array.from(elements)) {
                                            if (el instanceof HTMLVideoElement) {
                                                el.muted = true;
                                                el.play().catch(() => { });
                                            }
                                            else {
                                                el.focus();
                                                el.click();
                                            }
                                            await delay(200);
                                        }
                                    }
                                    catch (e) { }
                                }
                            };
                            const findBestVideoAndMeta = async () => {
                                const metadata = { title: document.title, thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };
                                const getMeta = (prop, name) => {
                                    const el = document.querySelector(`meta[property="${prop}"], meta[name="${name}"]`);
                                    return el ? el.content : "";
                                };
                                metadata.title = getMeta("og:title", "title") || metadata.title;
                                metadata.thumbnail = getMeta("og:image", "image") || "";
                                metadata.author = getMeta("og:site_name", "author");
                                metadata.tags = (getMeta("og:video:tag", "keywords") || '').split(',').map(s => s.trim());
                                const videos = Array.from(document.querySelectorAll('video'));
                                let bestSrc = null;
                                let maxScore = -1;
                                let bestVideoEl = null;
                                for (const v of videos) {
                                    const rect = v.getBoundingClientRect();
                                    let score = rect.width * rect.height;
                                    const idClass = (v.id + " " + v.className).toLowerCase();
                                    if (idClass.match(/player|main|primary|hero|video-js|vjs|jwplayer/))
                                        score += 1000000;
                                    if (v.src && !v.src.startsWith('blob:')) {
                                        if (score > maxScore) {
                                            maxScore = score;
                                            bestSrc = v.src;
                                            bestVideoEl = v;
                                            if (!isNaN(v.duration))
                                                metadata.duration = v.duration;
                                        }
                                    }
                                    else {
                                        const sources = Array.from(v.querySelectorAll('source'));
                                        for (const s of sources) {
                                            if (s.src && !s.src.startsWith('blob:')) {
                                                if (score > maxScore) {
                                                    maxScore = score;
                                                    bestSrc = s.src;
                                                    bestVideoEl = v;
                                                    if (!isNaN(v.duration))
                                                        metadata.duration = v.duration;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (bestVideoEl) {
                                    const webm = await captureWebMPreview(bestVideoEl);
                                    if (webm) {
                                        metadata.thumbnail = webm;
                                    }
                                    else {
                                        const jpeg = await captureJpegFrame(bestVideoEl);
                                        if (jpeg)
                                            metadata.thumbnail = jpeg;
                                    }
                                }
                                return { src: bestSrc, metadata };
                            };
                            let result = await findBestVideoAndMeta();
                            if (!result.src && !result.metadata.thumbnail.startsWith('data:video')) {
                                await delay(2500);
                                await clickAllPlayers();
                                await delay(3000);
                                result = await findBestVideoAndMeta();
                            }
                            return result;
                        }
                    });
                    const foundResult = results[0]?.result;
                    logger.log("[doTabExtraction] Injected script result - src:", foundResult?.src ?? 'null', "| thumbnail length:", foundResult?.metadata?.thumbnail?.length ?? 0, "| latestM3u8:", latestM3u8 ?? 'null');
                    // BUG FIX: captureTab expects a tabId, NOT a windowId.
                    // Previously this passed scraperWindowId (window ID) to captureTab which
                    // silently failed, leaving the thumbnail empty.
                    if (!foundResult?.metadata?.thumbnail && scraperTabId !== undefined) {
                        try {
                            logger.log("[doTabExtraction] No thumbnail from injected script. Attempting captureTab fallback on tabId:", scraperTabId);
                            await browser.tabs.update(scraperTabId, { active: true });
                            await new Promise(r => setTimeout(r, 800));
                            // captureTab is Firefox-specific; captureVisibleTab is cross-browser.
                            // We prefer captureTab(tabId) to avoid switching the visible tab.
                            const captureTabFn = browser.tabs.captureTab;
                            const snap = captureTabFn
                                ? await captureTabFn(scraperTabId, { format: "jpeg", quality: 30 })
                                : await browser.tabs.captureVisibleTab(scraperWindowId, { format: "jpeg", quality: 30 });
                            if (snap && foundResult) {
                                logger.log("[doTabExtraction] captureTab/captureVisibleTab succeeded. thumbnail length:", snap.length);
                                foundResult.metadata.thumbnail = snap;
                            }
                            else {
                                logger.warn("[doTabExtraction] captureTab/captureVisibleTab returned nothing.");
                            }
                        }
                        catch (e) {
                            logger.warn("[doTabExtraction] Tab screenshot fallback failed:", e);
                        }
                    }
                    if (latestM3u8 && foundResult) {
                        logger.log("[doTabExtraction] Resolving with network-intercepted src:", latestM3u8, "| thumbnail:", !!foundResult.metadata.thumbnail);
                        foundResult.src = latestM3u8;
                        cleanup(foundResult, "Intercepted network src");
                    }
                    else if (foundResult?.src) {
                        logger.log("[doTabExtraction] Resolving with DOM-extracted src:", foundResult.src, "| thumbnail:", !!foundResult.metadata.thumbnail);
                        cleanup(foundResult, "DOM extraction success");
                    }
                    else if (latestM3u8) {
                        logger.log("[doTabExtraction] Resolving with network-only fallback. No DOM src. thumbnail:", !!(foundResult?.metadata?.thumbnail));
                        cleanup({ src: latestM3u8, metadata: foundResult?.metadata ?? defaultMetadata }, "Network fallback");
                    }
                    else {
                        logger.warn("[doTabExtraction] No src found. Scheduling 2s timeout fallback.");
                        setTimeout(() => {
                            cleanup(latestM3u8 ? { src: latestM3u8, metadata: foundResult?.metadata ?? defaultMetadata } : (foundResult ?? null), "Timeout fallback");
                        }, 2000);
                    }
                }
                catch (e) {
                    logger.error("[doTabExtraction] Injection threw an error:", e);
                    cleanup(null, "Injection threw an error");
                }
            };
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
    logger.log("[runCapturePipeline] Received capture request. url:", data.url, "| thumbnail from content.ts:", !!data.thumbnail, "(len:", data.thumbnail?.length ?? 0, ")");
    try {
        const targetUrl = data.url;
        let finalSrc = data.url;
        if (!data.thumbnail && windowId) {
            try {
                logger.log("[runCapturePipeline] No initial thumbnail. Capturing visible tab screenshot from windowId:", windowId);
                data.thumbnail = await browser.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 20 });
                logger.log("[runCapturePipeline] captureVisibleTab succeeded. thumbnail length:", data.thumbnail?.length ?? 0);
            }
            catch (e) {
                logger.warn("[runCapturePipeline] captureVisibleTab failed:", e);
            }
        }
        else {
            logger.log("[runCapturePipeline] Thumbnail already present from content.ts (len:", data.thumbnail?.length ?? 0, "). Skipping captureVisibleTab.");
        }
        logger.log("[runCapturePipeline] Starting doTabExtraction for:", targetUrl);
        const extracted = await doTabExtraction(targetUrl);
        logger.log("[runCapturePipeline] doTabExtraction returned. src:", extracted?.src ?? 'null', "| scraped thumbnail length:", extracted?.metadata?.thumbnail?.length ?? 0);
        if (extracted && extracted.src) {
            finalSrc = extracted.src;
            if (extracted.metadata) {
                // BUG FIX: Object.assign would unconditionally overwrite data.thumbnail with "" when
                // the scraper tab fails to capture a thumbnail (defaultMetadata.thumbnail = "").
                // This silently destroyed the fallback thumbnail sent by the content script.
                // Fix: only merge scraped metadata fields that are non-empty/non-zero.
                const preThumb = data.thumbnail;
                const meta = extracted.metadata;
                if (meta.title) {
                    logger.log("[runCapturePipeline] Scraped title:", meta.title);
                    data.title = meta.title;
                }
                if (meta.author) {
                    logger.log("[runCapturePipeline] Scraped author:", meta.author);
                    data.author = meta.author;
                }
                if (meta.thumbnail) {
                    logger.log("[runCapturePipeline] Scraped thumbnail present (len:", meta.thumbnail.length, "). Replacing fallback.");
                    data.thumbnail = meta.thumbnail;
                }
                else {
                    logger.log("[runCapturePipeline] Scraped thumbnail is EMPTY. Preserving existing thumbnail (len:", preThumb?.length ?? 0, ").");
                }
                if (meta.duration) {
                    data.duration = meta.duration;
                }
                if (meta.views) {
                    data.views = meta.views;
                }
                if (Array.isArray(meta.tags) && meta.tags.length > 0) {
                    data.tags = meta.tags;
                }
                if (meta.likes) {
                    data.likes = meta.likes;
                }
                if (meta.date) {
                    data.date = meta.date;
                }
            }
        }
        else {
            logger.warn("[runCapturePipeline] Extraction returned no usable src. Falling back to original URL:", targetUrl);
        }
        data.rawVideoSrc = finalSrc;
        logger.log("[runCapturePipeline] Final rawVideoSrc:", data.rawVideoSrc, "| final thumbnail length:", data.thumbnail?.length ?? 0);
        const saved = await getSavedVideos(true);
        logger.log("[runCapturePipeline] Existing vault size:", saved.length);
        if (saved.some(v => v.url === data.url)) {
            logger.warn("[runCapturePipeline] Item already exists in vault. Aborting save. url:", data.url);
            return { success: false, message: "Item already in vault" };
        }
        saved.push(data);
        await saveVideos(saved);
        logger.log("[runCapturePipeline] Saved! New vault size:", saved.length);
        // BUG FIX: data.thumbnail can be falsy/empty string. Using optional chaining avoids TypeError.
        const thumbIsWebm = data.thumbnail?.startsWith('data:video');
        if (data.rawVideoSrc && !thumbIsWebm) {
            logger.log("[runCapturePipeline] Queuing background preview generation for:", data.rawVideoSrc);
            setupOffscreenDocument().then(() => {
                browser.runtime.sendMessage({
                    action: "generate_preview",
                    data: { url: data.rawVideoSrc, duration: typeof data.duration === 'number' ? data.duration : 60 }
                }).catch((e) => {
                    logger.warn("[runCapturePipeline] generate_preview message failed:", e);
                });
            });
        }
        else {
            logger.log("[runCapturePipeline] Skipping preview generation (no rawVideoSrc or thumbnail is already a WebM).");
        }
        return { success: true, data };
    }
    catch (err) {
        logger.error("[runCapturePipeline] Unhandled error:", err);
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
