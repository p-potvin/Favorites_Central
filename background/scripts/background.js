import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../../src/lib/storage-vault';
import { STORAGE_KEYS } from '../../src/lib/constants';
/**
 * Extensive Logging Utility
 */
class DebugLogger {
    logs = [];
    log(msg, ...args) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Debug] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.log(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
    }
    warn(msg, ...args) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Warn] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.warn(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
    }
    error(msg, ...args) {
        const time = new Date().toISOString();
        const line = `[${time}] [VaultAuth-Error] ${msg} ${args.map((a) => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
        console.error(line);
        this.logs.push(line);
        if (this.logs.length > 500)
            this.logs.shift();
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
/**
 * [VaultAuth] Background Extraction Logic
 * ---------------------------------------
 * Performs a background extraction of video sources from a target URL.
 * Uses a temporary hidden tab to intercept network requests and run injection logic.
 * Compatible with Chrome and Firefox via webextension-polyfill.
 */
async function doTabExtraction(targetUrl) {
    logger.log("Starting extraction for:", targetUrl);
    let scraperTabId = undefined;
    let webRequestListener = null;
    let globalTimeoutId = null;
    let scraperWindowId = undefined;
    return new Promise(async (resolve) => {
        let isResolved = false;
        let latestM3u8 = null;
        let injectionStarted = false;
        const defaultMetadata = { title: "", thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };
        const cleanup = async (result, reason) => {
            if (isResolved)
                return;
            isResolved = true;
            logger.log(`Cleanup triggered. Reason: ${reason}. TabID: ${scraperTabId}`);
            if (globalTimeoutId)
                clearTimeout(globalTimeoutId);
            if (webRequestListener && browser.webRequest) {
                try {
                    browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
                    logger.log("Removed webRequest listener.");
                }
                catch (e) {
                    logger.warn("Error removing webRequest listener:", e);
                }
            }
            if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.remove(scraperTabId);
                    logger.log("Removed tracking tab.");
                }
                catch (e) {
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
                logger.warn("Global isolation timeout reached (16s)");
                cleanup(latestM3u8 ? { src: latestM3u8, metadata: defaultMetadata } : null, "Timeout reached");
            }, 16000);
            // 1. Network intercept for .m3u8 and .ts (HLS/TS streams)
            if (browser.webRequest) {
                logger.log("Adding webRequest listener for stream interception...");
                webRequestListener = (details) => {
                    const lowercaseUrl = details.url.toLowerCase();
                    if (details.tabId === scraperTabId) {
                        logger.log(`Network request intercepted locally in tab ${scraperTabId}:`, details.url);
                    }
                    if (details.tabId === scraperTabId && (lowercaseUrl.includes('.m3u8') || lowercaseUrl.includes('.ts'))) {
                        logger.log("Successfully intercepted stream:", details.url);
                        latestM3u8 = details.url;
                        // We don't resolve immediately; keep listening until script injection or timeout
                    }
                };
                browser.webRequest.onBeforeRequest.addListener(webRequestListener, { urls: ["<all_urls>"], tabId: scraperTabId });
            }
            // 2. DOM Extraction via Script Injection
            const tabUpdateListener = (tabId, info) => {
                if (tabId === scraperTabId && info.status === 'complete') {
                    logger.log(`scraperTab ${tabId} update status: complete. Injecting script...`);
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                    injectScript();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);
            const injectScript = async () => {
                if (injectionStarted || isResolved || scraperTabId === undefined)
                    return;
                injectionStarted = true;
                try {
                    logger.log("Executing script in scraperTab to find video/metadata...");
                    const results = await browser.scripting.executeScript({
                        target: { tabId: scraperTabId },
                        func: async () => {
                            const delay = (ms) => new Promise(r => setTimeout(r, ms));
                            const captureVideoFrame = async (video) => {
                                try {
                                    if (video.readyState < 2) {
                                        await new Promise((res) => {
                                            video.addEventListener('loadeddata', res, { once: true });
                                            setTimeout(res, 1000);
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
                                }
                                catch (e) {
                                    return null;
                                }
                                return null;
                            };
                            const findBestVideoAndMeta = async () => {
                                const metadata = { title: document.title, thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };
                                const ogTitle = document.querySelector('meta[property="og:title"]');
                                if (ogTitle)
                                    metadata.title = ogTitle.content || metadata.title;
                                const ogImage = document.querySelector('meta[property="og:image"]');
                                if (ogImage)
                                    metadata.thumbnail = ogImage.content;
                                const metaTags = document.querySelector('meta[name="keywords"]');
                                if (metaTags)
                                    metadata.tags = (metaTags.content || '').split(',').map((s) => s.trim());
                                const authorMeta = document.querySelector('meta[name="author"]');
                                if (authorMeta)
                                    metadata.author = authorMeta.content;
                                // Try to scrape random text nodes for views, likes, dates like the content script does
                                try {
                                    const texts = Array.from(document.querySelectorAll('span, p, h1, h2, h3, h4, a, div'))
                                        .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
                                        .map(el => el.textContent?.trim() || '')
                                        .filter(t => t.length > 0);
                                    for (const text of texts) {
                                        const lower = text.toLowerCase();
                                        if (/^\d+(?:[kKmMbB])?\s*(?:views?|plays?)$/i.test(lower)) {
                                            if (!metadata.views)
                                                metadata.views = text;
                                        }
                                        if (/^\d+(?:[kKmMbB])?\s*(?:likes?)$/i.test(lower)) {
                                            if (!metadata.likes)
                                                metadata.likes = text;
                                        }
                                        if (/(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
                                            if (!metadata.date)
                                                metadata.date = text;
                                        }
                                    }
                                }
                                catch (e) { }
                                const videos = Array.from(document.querySelectorAll('video'));
                                let bestSrc = null;
                                let maxScore = -1;
                                let bestVideoEl = null;
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
                                if (!bestSrc) {
                                    const wildcards = document.querySelectorAll('[src*=".mp4"], [src*=".m3u8"], [src*=".webm"], [src*=".ts"]');
                                    for (const w of Array.from(wildcards)) {
                                        const src = w.src;
                                        if (src && !src.startsWith('blob:')) {
                                            bestSrc = src;
                                            break;
                                        }
                                    }
                                }
                                // Actually attempt to grab the video frame directly internally as thumbnail
                                if (bestVideoEl) {
                                    const frame = await captureVideoFrame(bestVideoEl);
                                    if (frame)
                                        metadata.thumbnail = frame;
                                }
                                return { src: bestSrc, metadata };
                            };
                            let result = await findBestVideoAndMeta();
                            if (!result.src && !result.metadata.thumbnail) {
                                // Wait for potential async video initialization inside the page
                                await delay(2500);
                                result = await findBestVideoAndMeta();
                            }
                            return result;
                        }
                    });
                    const foundResult = results[0]?.result;
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
                        }
                        catch (captureErr) {
                            logger.error("Failed to capture scraper tab after activation:", captureErr);
                        }
                    }
                    if (foundResult?.src) {
                        cleanup(foundResult, "Script injection success");
                    }
                    else if (latestM3u8) {
                        // Fallback to intercepted m3u8 if DOM extraction completely failed
                        cleanup({ src: latestM3u8, metadata: defaultMetadata }, "Fallback to intercepted network m3u8");
                    }
                    else {
                        logger.log("Nothing found, delaying 2s to catch network stragglers...");
                        // In case nothing was found, delay a tiny bit more for network intercept to catch stragglers
                        setTimeout(() => {
                            if (latestM3u8) {
                                cleanup({ src: latestM3u8, metadata: defaultMetadata }, "Late intercepted network m3u8");
                            }
                            else {
                                cleanup(foundResult || null, "No m3u8 or injection success after timeout");
                            }
                        }, 2000);
                    }
                }
                catch (e) {
                    logger.error("Injection error:", e);
                    cleanup(null, "Injection threw an error");
                }
            };
        }
        catch (e) {
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
    let dashboardTab;
    if (storedTabId && typeof storedTabId === 'number') {
        try {
            dashboardTab = await browser.tabs.get(storedTabId);
        }
        catch (e) {
            // Tab likely closed
        }
    }
    if (!dashboardTab) {
        dashboardTab = tabs.find(t => t.url && t.url.startsWith(url));
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
    }
    else {
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
async function runCapturePipeline(data, tabId, windowId) {
    try {
        const targetUrl = data.url;
        let finalSrc = data.url;
        // Fallback Thumbnail: Try to grab a screenshot immediately before user navigates away
        if (!data.thumbnail && windowId) {
            try {
                const dataUrl = await browser.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 20 });
                data.thumbnail = dataUrl;
            }
            catch (captureErr) {
                console.warn("[VaultAuth] Failed to capture visible tab for thumbnail", captureErr);
            }
        }
        // Perform deep extraction to get better metadata and resolve potential HTML containers
        const extracted = await doTabExtraction(targetUrl);
        if (extracted && extracted.src) {
            finalSrc = extracted.src;
            if (extracted.metadata) {
                if (extracted.metadata.thumbnail)
                    data.thumbnail = extracted.metadata.thumbnail;
                if (extracted.metadata.duration)
                    data.duration = extracted.metadata.duration;
                if (extracted.metadata.title)
                    data.title = extracted.metadata.title;
                if (extracted.metadata.tags && extracted.metadata.tags.length > 0)
                    data.tags = extracted.metadata.tags;
                if (extracted.metadata.author)
                    data.author = extracted.metadata.author;
                if (extracted.metadata.views)
                    data.views = extracted.metadata.views;
                if (extracted.metadata.likes)
                    data.likes = extracted.metadata.likes;
                if (extracted.metadata.date)
                    data.date = extracted.metadata.date;
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
    }
    catch (err) {
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
    if (!browser.offscreen) {
        logger.log("browser.offscreen is missing, attempting Firefox iframe fallback...");
        if (typeof document !== 'undefined' && document.body) {
            let frame = document.getElementById('vault-processor-frame');
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
        }
        else {
            logger.warn("browser.offscreen missing and no DOM (document.body) available for iframe fallback.");
            return;
        }
    }
    // Check if it's already there (for Chrome)
    try {
        const contexts = await browser.runtime.getContexts({
            contextTypes: ['OFFSCREEN_DOCUMENT'],
            documentUrls: [browser.runtime.getURL(offscreenUrl)]
        });
        if (contexts && contexts.length > 0)
            return;
    }
    catch (e) {
        // Fallback for older chrome or if getContexts is not available
    }
    try {
        await browser.offscreen.createDocument({
            url: offscreenUrl,
            reasons: ['DOM_PARSER', 'AUDIO_PLAYBACK', 'BLOBS'],
            justification: 'FFmpeg WASM processing for video previews'
        });
        logger.log("Created offscreen document (Chrome).");
    }
    catch (e) {
        logger.error("Failed to create offscreen document", e);
    }
}
/**
 * Message Dispatcher
 */
browser.runtime.onMessage.addListener((request, sender) => {
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
    }
    else if (command === "capture-video") {
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
            }
            catch (error) {
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
                }
                catch (e) {
                    console.error("[VaultAuth] Could not even inject alert:", e);
                }
            }
        }
        catch (error) {
            console.error("[VaultAuth] Fatal error in capture-video shortcut:", error);
        }
    }
});
