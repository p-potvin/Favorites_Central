import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../../src/lib/storage-vault';
import { STORAGE_KEYS } from '../../src/lib/constants';

/**
 * Extensive Logging Utility
 */
class DebugLogger {
    private logs: string[] = [];
    
    log(msg: string, ...args: any) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Debug] ${msg} ${args.map((a: any) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.log(line);
        this.logs.push(line);
        if (this.logs.length > 500) this.logs.shift();
    }
    
    warn(msg: string, ...args: any) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Warn] ${msg} ${args.map((a: any) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.warn(line);
        this.logs.push(line);
        if (this.logs.length > 500) this.logs.shift();
    }
    
    error(msg: string, ...args: any) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Error] ${msg} ${args.map((a: any) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.error(line);
        this.logs.push(line);
        if (this.logs.length > 500) this.logs.shift();
    }

    async downloadLogFile() {
        const blob = new Blob([this.logs.join('\n')], { type: 'text/plain' });
        const objUrl = URL.createObjectURL(blob);
        await browser.downloads.download({
            url: objUrl,
            filename: `vault_central_debug_${Date.now()}.log`
        });
        URL.revokeObjectURL(objUrl);
    }
}
const logger = new DebugLogger();

export interface ExtractionResult {
    src: string | null;
    metadata: {
        title: string;
        thumbnail: string;
        duration: number;
        author: string;
        views: string;
        tags: string[];
        likes: string;
        date: string;
    };
}

const DIRECT_VIDEO_EXTS = /\.(mp4|webm|mkv|mov|avi|flv|ogv|ogg|m3u8|ts)(\?.*)?$/i;

/**
 * [VaultAuth] Background Extraction Logic
 * ---------------------------------------
 * Performs a background extraction of video sources from a target URL.
 * Uses a temporary hidden tab to intercept network requests and run injection logic.
 * Compatible with Chrome and Firefox via webextension-polyfill.
 */
async function doTabExtraction(targetUrl: string): Promise<ExtractionResult | null> {
    logger.log("Starting extraction for:", targetUrl);

    // Fast path: if the URL is already a direct video/media file, return it immediately
    // without opening a new tab — nothing to extract from an HTML page.
    const bare = targetUrl.split('?')[0];
    if (DIRECT_VIDEO_EXTS.test(bare)) {
        logger.log("Direct video URL detected — skipping tab extraction:", targetUrl);
        return {
            src: targetUrl,
            metadata: { title: "", thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" }
        };
    }

    let scraperTabId: number | undefined = undefined;
    let webRequestListener: ((details: browser.WebRequest.OnBeforeRequestDetailsType) => void) | null = null;
    let globalTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let scraperWindowId: number | undefined = undefined;

    return new Promise(async (resolve) => {
        let isResolved = false;
        let latestM3u8: string | null = null;
        let injectionStarted = false;

        const defaultMetadata = { title: "", thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };

        const cleanup = async (result: ExtractionResult | null, reason: string) => {
            if (isResolved) return;
            isResolved = true;

            logger.log(`Cleanup triggered. Reason: ${reason}. TabID: ${scraperTabId}`);

            if (globalTimeoutId) clearTimeout(globalTimeoutId);

            if (webRequestListener && browser.webRequest) {
                try {
                    browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
                    logger.log("Removed webRequest listener.");
                } catch (e) {
                    logger.warn("Error removing webRequest listener:", e);
                }
            }

            if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.remove(scraperTabId);
                    logger.log("Removed tracking tab.");
                } catch (e) {
                    /* ignore if already closed */
                    logger.log("Tab already closed or error inside cleanup:", e);
                }
            }

            resolve(result);
        };

        try {
            logger.log("Creating inactive background tab for scraping...");
            // Create a background tab (not active)
            const scraperTab = await browser.tabs.create({ url: targetUrl, active: false });
            scraperTabId = scraperTab.id;
            scraperWindowId = scraperTab.windowId;
            logger.log(`Scraper Tab Created: ID=${scraperTabId}, WindowID=${scraperWindowId}`);

            // Global safety timeout
            globalTimeoutId = setTimeout(() => {
                logger.warn("Global isolation timeout reached (25s)");
                cleanup(latestM3u8 ? { src: latestM3u8, metadata: defaultMetadata } : null, "Timeout reached");
            }, 25000);

            // 1. Network intercept for streaming and direct video requests
            if (browser.webRequest) {
                logger.log("Adding webRequest listener for stream interception...");
                webRequestListener = (details) => {
                    const lowercaseUrl = details.url.toLowerCase();
                    if (details.tabId === scraperTabId) {
                        logger.log(`Network request intercepted in tab ${scraperTabId}:`, details.url);
                    }
                    if (details.tabId === scraperTabId) {
                        const isStream = lowercaseUrl.includes('.m3u8') || lowercaseUrl.includes('manifest');
                        const isDirectVideo = /\.(mp4|webm|flv|mkv|mov|ts)(\?|$)/.test(lowercaseUrl);
                        if (isStream || isDirectVideo) {
                            logger.log("Successfully intercepted media request:", details.url);
                            // Prefer streaming manifests over direct files for better compatibility
                            if (!latestM3u8 || isStream) {
                                latestM3u8 = details.url;
                            }
                        }
                    }
                };

                browser.webRequest.onBeforeRequest.addListener(
                    webRequestListener,
                    { urls: ["<all_urls>"], tabId: scraperTabId }
                );
            }

            // 2. DOM Extraction via Script Injection
            const tabUpdateListener = (tabId: number, info: browser.Tabs.OnUpdatedChangeInfoType) => {
                if (tabId === scraperTabId && info.status === 'complete') {
                    logger.log(`scraperTab ${tabId} update status: complete. Injecting script...`);
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                    injectScript();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);

            const injectScript = async () => {
                if (injectionStarted || isResolved || scraperTabId === undefined) return;
                injectionStarted = true;

                try {
                    logger.log("Executing script in scraperTab to find video/metadata...");
                    const results = await browser.scripting.executeScript({
                        target: { tabId: scraperTabId },
                        func: async () => {
                            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
                            
                            const captureVideoFrame = async (video: HTMLVideoElement): Promise<string | null> => {
                                try {
                                    // Ensure it's playing or at least seeked slightly to have video content
                                    if (video.currentTime === 0) {
                                      video.currentTime = 5; // seek slightly into the video
                                      await new Promise(r => setTimeout(r, 800));
                                    }

                                    if (video.readyState < 2) {
                                        await new Promise((res) => {
                                            video.addEventListener('loadeddata', res, {once: true});
                                            setTimeout(res, 2000);
                                        });
                                    }
                                    const canvas = document.createElement('canvas');
                                    canvas.width = video.videoWidth || 640;
                                    canvas.height = video.videoHeight || 360;
                                    const ctx = canvas.getContext('2d');
                                    if (ctx) {
                                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                        return canvas.toDataURL('image/jpeg', 0.5);
                                    }
                                } catch (e) {
                                    return null;
                                }
                                return null;
                            };

                            const clickAllPlayers = async () => {
                                const selectors = [
                                    'video', 'iframe', 'button[aria-label*="Play"]', 
                                    'button[title*="Play"]', '.vjs-big-play-button', 
                                    '.ytp-large-play-button', '.jw-display-icon-container',
                                    '[class*="play"]', '[id*="play"]', '[role="button"]'
                                ];
                                
                                for (const selector of selectors) {
                                    try {
                                        const elements = document.querySelectorAll(selector);
                                        for (const el of Array.from(elements)) {
                                            const rect = el.getBoundingClientRect();
                                            if (rect.width > 0 && rect.height > 0) {
                                                if (el instanceof HTMLVideoElement) {
                                                    el.play().catch(() => {});
                                                } else {
                                                    (el as HTMLElement).click();
                                                }
                                                // Small delay between clicks to prevent browser from blocking or site from lagging
                                                await delay(200);
                                            }
                                        }
                                    } catch (e) {}
                                }
                            };

                            const findBestVideoAndMeta = async () => {
                                const metadata = { title: document.title, thumbnail: "", duration: 0, author: "", views: "", tags: [] as string[], likes: "", date: "" };
                                
                                const ogTitle = document.querySelector('meta[property="og:title"]');
                                if (ogTitle) metadata.title = (ogTitle as any).content || metadata.title;

                                const ogImage = document.querySelector('meta[property="og:image"]');
                                if (ogImage) metadata.thumbnail = (ogImage as any).content;

                                const metaTags = document.querySelector('meta[name="keywords"]');
                                if (metaTags) metadata.tags = ((metaTags as any).content || '').split(',').map((s:string) => s.trim());

                                const authorMeta = document.querySelector('meta[name="author"]');
                                if (authorMeta) metadata.author = (authorMeta as any).content;

                                // Try to scrape random text nodes for views, likes, dates like the content script does
                                try {
                                    const texts = Array.from(document.querySelectorAll('span, p, h1, h2, h3, h4, a, div'))
                                        .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
                                        .map(el => el.textContent?.trim() || '')
                                        .filter(t => t.length > 0);
                                    
                                    for (const text of texts) {
                                        const lower = text.toLowerCase();
                                        if (/^\d+(?:[kKmMbB])?\s*(?:views?|plays?)$/i.test(lower)) {
                                            if (!metadata.views) metadata.views = text;
                                        }
                                        if (/^\d+(?:[kKmMbB])?\s*(?:likes?)$/i.test(lower)) {
                                            if (!metadata.likes) metadata.likes = text;
                                        }
                                        if (/(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
                                            if (!metadata.date) metadata.date = text;
                                        }
                                    }
                                } catch(e) {}

                                const videos = Array.from(document.querySelectorAll('video'));
                                let bestSrc: string | null = null;
                                let maxScore = -1;
                                let bestVideoEl: HTMLVideoElement | null = null;

                                for (const v of videos) {
                                    const rect = v.getBoundingClientRect();
                                    let score = rect.width * rect.height;
                                    
                                    const idClass = (v.id + " " + v.className).toLowerCase();
                                    if (idClass.match(/player|main|primary|hero|video-js|vjs|jwplayer/)) {
                                        score += 1000000;
                                    }

                                    if (v.src && !v.src.startsWith('blob:')) {
                                        if (score > maxScore) {
                                            maxScore = score;
                                            bestSrc = v.src;
                                            bestVideoEl = v;
                                            if (!isNaN(v.duration)) metadata.duration = v.duration;
                                        }
                                    } else {
                                        const sources = Array.from(v.querySelectorAll('source'));
                                        for (const s of sources) {
                                            if (s.src && !s.src.startsWith('blob:')) {
                                                if (score > maxScore) {
                                                    maxScore = score;
                                                    bestSrc = s.src;
                                                    bestVideoEl = v;
                                                    if (!isNaN(v.duration)) metadata.duration = v.duration;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (!bestSrc) {
                                    const wildcards = document.querySelectorAll('[src*=".mp4"], [src*=".m3u8"], [src*=".webm"], [src*=".ts"]');
                                    for (const w of Array.from(wildcards)) {
                                        const src = (w as any).src;
                                        if (src && !src.startsWith('blob:')) {
                                            bestSrc = src;
                                            break;
                                        }
                                    }
                                }

                                // Actually attempt to grab the video frame directly internally as thumbnail
                                if (bestVideoEl) {
                                    const frame = await captureVideoFrame(bestVideoEl);
                                    if (frame) metadata.thumbnail = frame;
                                }

                                return { src: bestSrc, metadata };
                            };

                            let result = await findBestVideoAndMeta();
                            if (!result.src) {
                                // Wait 2.5 s for async video initialisation, then trigger play
                                // so lazy-loaded players (YouTube-style, blob sources) emit
                                // network requests that the background webRequest listener can intercept.
                                await delay(2500);

                                const allVideos = Array.from(document.querySelectorAll('video'));
                                if (allVideos.length > 0) {
                                    let mainPlayer: HTMLVideoElement | null = null;
                                    let maxScore = -1;
                                    for (const v of allVideos) {
                                        const rect = v.getBoundingClientRect();
                                        let score = rect.width * rect.height;
                                        const idClass = (v.id + ' ' + v.className).toLowerCase();
                                        if (idClass.match(/media-player|player|main|primary|hero|video-js|vjs|jwplayer/)) {
                                            score += 1000000;
                                        }
                                        if (score > maxScore) { maxScore = score; mainPlayer = v; }
                                    }
                                    if (mainPlayer) {
                                        try {
                                            mainPlayer.muted = true;
                                            mainPlayer.currentTime = 0.1;
                                            await mainPlayer.play();
                                        } catch (_e) { /* autoplay may be blocked — ignore */ }
                                    }
                                }

                                logger.log("Passive scan failed, attempting aggressive clicks...");
                                await clickAllPlayers();
                                await delay(3000);
                                result = await findBestVideoAndMeta();
                            }
                            return result;
                        }
                    });

                    const foundResult = results[0]?.result as ExtractionResult | undefined;
                    logger.log("Script inject result resolved.", foundResult);

                    if (!foundResult?.metadata?.thumbnail && scraperWindowId !== undefined) {
                        logger.log("Thumbnail not generated via script, attempting to briefly activate tab for capture...");
                        try {
                            await browser.tabs.update(scraperTabId, { active: true });
                            await new Promise(r => setTimeout(r, 800)); // allow paint
                            const snap = await browser.tabs.captureVisibleTab(scraperWindowId, { format: "jpeg", quality: 30 });
                            if (snap && foundResult) {
                                foundResult.metadata.thumbnail = snap;
                                logger.log("Successfully captured active scraper tab screenshot.");
                            }
                        } catch (captureErr) {
                            logger.error("Failed to capture scraper tab after activation:", captureErr);
                        }
                    }

                    // Prefer an intercepted streaming manifest/direct-video URL over a DOM-extracted
                    // blob or opaque src, but keep the richer metadata from the DOM extraction.
                    if (latestM3u8 && foundResult) {
                        foundResult.src = latestM3u8;
                        cleanup(foundResult, "Script injection success with intercepted network src");
                    } else if (foundResult?.src) {
                        cleanup(foundResult, "Script injection success");
                    } else if (latestM3u8) {
                        cleanup({ src: latestM3u8, metadata: foundResult?.metadata ?? defaultMetadata }, "Fallback to intercepted network media");
                    } else {
                        logger.log("Nothing found yet — waiting 2 s for network stragglers...");
                        setTimeout(() => {
                            if (latestM3u8) {
                                cleanup({ src: latestM3u8, metadata: foundResult?.metadata ?? defaultMetadata }, "Late intercepted network media");
                            } else {
                                cleanup(foundResult ?? null, "No media or injection success after timeout");
                            }
                        }, 2000);
                    }
                } catch (e) {
                    logger.error("Injection error:", e);
                    cleanup(null, "Injection threw an error");
                }
            };

        } catch (e) {
            logger.error("Tab isolation setup failed:", e);
            cleanup(null, "Internal isolation error");
        }
    });
}

/**
 * Singleton Dashboard Opener
 */
async function openDashboard() {
    const url = browser.runtime.getURL('dashboard-v2.html');
    const tabs = await browser.tabs.query({});

    // Check for existing dashboard by stored ID or URL fallback
    const { [STORAGE_KEYS.ACTIVE_TAB_ID]: storedTabId } = await browser.storage.local.get(STORAGE_KEYS.ACTIVE_TAB_ID);

    let dashboardTab: browser.Tabs.Tab | undefined;

    // Helper: returns true if tab is a valid dashboard tab
    function isValidDashboardTab(tab: browser.Tabs.Tab | undefined) {
        if (!tab || !tab.url) return false;
        // Ignore extension management/debugging pages
        if (tab.url.startsWith('about:debugging') || tab.url.startsWith('about:addons') || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) return false;
        // Only match dashboard-v2.html
        return tab.url.startsWith(url);
    }

    if (storedTabId && typeof storedTabId === 'number') {
        try {
            const candidateTab = await browser.tabs.get(storedTabId);
            if (isValidDashboardTab(candidateTab)) {
                dashboardTab = candidateTab;
            }
        } catch (e) {
            // Tab likely closed
        }
    }

    if (!dashboardTab) {
        dashboardTab = tabs.find(isValidDashboardTab);
    }

    if (dashboardTab && dashboardTab.id) {
        // If already open, focus it
        await browser.tabs.update(dashboardTab.id, { active: true });
        // Also focus the window just in case
        if (dashboardTab.windowId) {
            await browser.windows.update(dashboardTab.windowId, { focused: true });
        }
        // Update stored ID
        await browser.storage.local.set({ [STORAGE_KEYS.ACTIVE_TAB_ID]: dashboardTab.id });
    } else {
        // Otherwise create new
        const newTab = await browser.tabs.create({ url });
        if (newTab.id) {
            await browser.storage.local.set({ [STORAGE_KEYS.ACTIVE_TAB_ID]: newTab.id });
        }
    }
}

/**
 * Core Capture Processing Logic
 */
async function runCapturePipeline(data: any, tabId?: number, windowId?: number): Promise<any> {
    try {
        const targetUrl = data.url;
        let finalSrc = data.url;

        // Fallback Thumbnail: Try to grab a screenshot immediately before user navigates away
        if (!data.thumbnail && windowId) {
            try {
                const dataUrl = await browser.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 20 });
                data.thumbnail = dataUrl;
            } catch (captureErr) {
                console.warn("[VaultAuth] Failed to capture visible tab for thumbnail", captureErr);
            }
        }

        // Perform deep extraction to get better metadata and resolve potential HTML containers
        const extracted = await doTabExtraction(targetUrl);
        if (extracted && extracted.src) {
            finalSrc = extracted.src;
            
            if (extracted.metadata) {
                if (extracted.metadata.thumbnail) data.thumbnail = extracted.metadata.thumbnail;
                if (extracted.metadata.duration) data.duration = extracted.metadata.duration;
                if (extracted.metadata.title) data.title = extracted.metadata.title;
                if (extracted.metadata.tags && extracted.metadata.tags.length > 0) data.tags = extracted.metadata.tags;
                if (extracted.metadata.author) data.author = extracted.metadata.author;
                if (extracted.metadata.views) data.views = extracted.metadata.views;
                if (extracted.metadata.likes) data.likes = extracted.metadata.likes;
                if (extracted.metadata.date) data.date = extracted.metadata.date;
            }
        }

        data.rawVideoSrc = finalSrc;

        const saved = await getSavedVideos(true);
        // Check if item already exists based on URL to prevent duplicates
        if (saved.some(v => v.url === data.url)) {
            return { success: false, message: "Item already in vault" };
        }
        
        saved.push(data);
        await saveVideos(saved);

        /**
         * Trigger Background Preview Generation (Async)
         * No need to await this as we want primary capture to finish immediately.
         */
        if (data.rawVideoSrc) {
            setupOffscreenDocument().then(() => {
                browser.runtime.sendMessage({
                    action: "generate_preview",
                    data: { 
                        url: data.rawVideoSrc, 
                        duration: typeof data.duration === 'number' ? data.duration : 60 
                    }
                }).catch(err => console.warn("[VaultAuth] Background preview trigger failed:", err));
            });
        }

        return { success: true, data };
    } catch (err: any) {
        return { success: false, message: err.message };
    }
}

/**
 * Offscreen Management
 */
async function setupOffscreenDocument() {
    logger.log("Ensuring offscreen document for preview generation...");
    const offscreenUrl = 'src/offscreen/processor.html';
    
    // Check if browser.offscreen is supported (Firefox doesn't support it yet)
    if (!(browser as any).offscreen) {
        logger.log("browser.offscreen is missing, attempting Firefox iframe fallback...");
        if (typeof document !== 'undefined' && document.body) {
            let frame = document.getElementById('vault-processor-frame') as HTMLIFrameElement;
            if (!frame) {
                frame = document.createElement('iframe');
                frame.id = 'vault-processor-frame';
                frame.src = browser.runtime.getURL(offscreenUrl);
                document.body.appendChild(frame);
                
                await new Promise((resolve) => {
                    frame.onload = resolve;
                });
                logger.log("Successfully injected iframe for processor in Firefox background page.");
            }
            return;
        } else {
            logger.warn("browser.offscreen missing and no DOM (document.body) available for iframe fallback.");
            return;
        }
    }

    // Check if it's already there (for Chrome)
    try {
        const contexts = await (browser.runtime as any).getContexts({
            contextTypes: ['OFFSCREEN_DOCUMENT'],
            documentUrls: [browser.runtime.getURL(offscreenUrl)]
        });
        if (contexts && contexts.length > 0) return;
    } catch (e) {
        // Fallback for older chrome or if getContexts is not available
    }

    try {
        await (browser as any).offscreen.createDocument({
            url: offscreenUrl,
            reasons: ['DOM_PARSER', 'AUDIO_PLAYBACK', 'BLOBS' as any],
            justification: 'FFmpeg WASM processing for video previews'
        });
        logger.log("Created offscreen document (Chrome).");
    } catch (e) {
        logger.error("Failed to create offscreen document", e);
    }
}

/**
 * Message Dispatcher
 */
browser.runtime.onMessage.addListener((request: any, sender: any) => {
    if (request.action === "extract_fresh_m3u8") {
        return new Promise((resolve, reject) => {
            doTabExtraction(request.url)
                .then(res => resolve({ src: res?.src || null }))
                .catch(err => {
                    logger.error("extract_fresh_m3u8 error:", err);
                    resolve({ src: null });
                });
        });
    }
    if (request.action === "open_dashboard") {
        openDashboard();
        return Promise.resolve(true);
    }
    if (request.action === "process_capture") {
        return new Promise((resolve) => {
            runCapturePipeline(request.data, sender?.tab?.id, sender?.tab?.windowId)
                .then(resolve)
                .catch(err => resolve({ success: false, message: String(err) }));
        });
    }
    if (request.action === "generate_preview") {
        return new Promise((resolve) => {
            setupOffscreenDocument().then(() => {
                browser.runtime.sendMessage(request).catch(e => {
                     logger.warn("Sub-message for generate_preview failed, likely because no listener attached in time:", e);
                });
                resolve(true);
            }).catch(e => {
                logger.error("setupOffscreenDocument failed", e);
                resolve(false);
            });
        });
    }
    if (request.action === "download_debug_logs") {
        logger.downloadLogFile();
        return Promise.resolve(true);
    }
    return false;
});

/**
 * Handle Extension Action (Icon Click)
 */
browser.action.onClicked.addListener(() => {
    openDashboard();
});

/**
 * Handle Commands (Keyboard Shortcuts)
 */
browser.commands.onCommand.addListener(async (command) => {
    if (command === "_execute_action" || command === "open-dashboard") {
        openDashboard();
    } else if (command === "capture-video") {
        try {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const activeTab = tabs[0];
            
            if (!activeTab?.id || !activeTab.url || activeTab.url.startsWith('chrome:')) {
                return;
            }

            try {
                console.log("[VaultAuth] Sending shortcut command to tab", activeTab.id);
                const response = await browser.tabs.sendMessage(activeTab.id, { type: "capture-video" });
                if (!response) {
                    throw new Error("No response from content script");
                }
            } catch (error) {
                // If content script is dead/missing, we notify the user to refresh instead of continuing
                console.warn("[VaultAuth] Shortcut target unreachable:", error);
                
                // We use a generic notification via another method if possible, 
                // but since the content script is dead, we can't show our custom UI.
                // We'll use a basic browser notification or alert if allowed, 
                // or just log it and stop as requested.
                
                try {
                    // Try to inject a simple alert as a last resort since the main script is gone
                    await browser.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        func: () => {
                            alert("[Favorites Central] Extension script is not active on this page. Please refresh the page to enable video capture.");
                        }
                    });
                } catch (e) {
                    console.error("[VaultAuth] Could not even inject alert:", e);
                }
            }
        } catch (error) {
            console.error("[VaultAuth] Fatal error in capture-video shortcut:", error);
        }
    }
});
