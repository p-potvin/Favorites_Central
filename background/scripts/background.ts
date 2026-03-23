import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../../src/lib/storage-vault';

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

/**
 * [VaultAuth] Background Extraction Logic
 * ---------------------------------------
 * Performs a background extraction of video sources from a target URL.
 * Uses a temporary hidden tab to intercept network requests and run injection logic.
 * Compatible with Chrome and Firefox via webextension-polyfill.
 */
async function doTabExtraction(targetUrl: string): Promise<ExtractionResult | null> {
    console.log("[VaultAuth] Starting extraction for:", targetUrl);
    let scraperTabId: number | undefined = undefined;
    let webRequestListener: ((details: browser.WebRequest.OnBeforeRequestDetailsType) => void) | null = null;
    let globalTimeoutId: ReturnType<typeof setTimeout> | null = null;

    return new Promise(async (resolve) => {
        let isResolved = false;
        let latestM3u8: string | null = null;
        let injectionStarted = false;

        const defaultMetadata = { title: "", thumbnail: "", duration: 0, author: "", views: "", tags: [], likes: "", date: "" };

        const cleanup = async (result: ExtractionResult | null, reason: string) => {
            if (isResolved) return;
            isResolved = true;

            console.log(`[VaultAuth] Cleanup: ${reason}. TabID: ${scraperTabId}`);

            if (globalTimeoutId) clearTimeout(globalTimeoutId);

            if (webRequestListener && browser.webRequest) {
                try {
                    browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
                } catch (e) {
                    console.warn("[VaultAuth] Error removing webRequest listener:", e);
                }
            }

            if (scraperTabId !== undefined) {
                try {
                    await browser.tabs.remove(scraperTabId);
                } catch (e) {
                    /* ignore if already closed */
                    console.debug("[VaultAuth] Tab already closed or error:", e);
                }
            }

            resolve(result);
        };

        try {
            // Create a background tab (not active)
            const scraperTab = await browser.tabs.create({ url: targetUrl, active: false });
            scraperTabId = scraperTab.id;

            // Global safety timeout
            globalTimeoutId = setTimeout(() => {
                cleanup(latestM3u8 ? { src: latestM3u8, metadata: defaultMetadata } : null, "Global isolation timeout reached (16s)");
            }, 16000);

            // 1. Network intercept for .m3u8 (HLS Bypass)
            if (browser.webRequest) {
                webRequestListener = (details) => {
                    if (details.tabId === scraperTabId && details.url.includes('.m3u8')) {
                        console.log("[VaultAuth] Intercepted HLS stream:", details.url);
                        latestM3u8 = details.url;
                        // We don't resolve immediately; keep listening until script injection or timeout
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
                    browser.tabs.onUpdated.removeListener(tabUpdateListener);
                    injectScript();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);

            const injectScript = async () => {
                if (injectionStarted || isResolved || scraperTabId === undefined) return;
                injectionStarted = true;

                try {
                    const results = await browser.scripting.executeScript({
                        target: { tabId: scraperTabId },
                        func: async () => {
                            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
                            
                            const findBestVideoAndMeta = () => {
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
                                            if (!isNaN(v.duration)) metadata.duration = v.duration;
                                        }
                                    } else {
                                        const sources = Array.from(v.querySelectorAll('source'));
                                        for (const s of sources) {
                                            if (s.src && !s.src.startsWith('blob:')) {
                                                if (score > maxScore) {
                                                    maxScore = score;
                                                    bestSrc = s.src;
                                                    if (!isNaN(v.duration)) metadata.duration = v.duration;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (!bestSrc) {
                                    const wildcards = document.querySelectorAll('[src*=".mp4"], [src*=".m3u8"], [src*=".webm"]');
                                    for (const w of Array.from(wildcards)) {
                                        const src = (w as any).src;
                                        if (src && !src.startsWith('blob:')) {
                                            bestSrc = src;
                                            break;
                                        }
                                    }
                                }

                                return { src: bestSrc, metadata };
                            };

                            let result = findBestVideoAndMeta();
                            if (!result.src) {
                                // Wait for potential async video initialization inside the page
                                await delay(2500);
                                result = findBestVideoAndMeta();
                            }
                            return result;
                        }
                    });

                    const foundResult = results[0]?.result as ExtractionResult | undefined;
                    if (foundResult?.src) {
                        cleanup(foundResult, "Script injection success");
                    } else if (latestM3u8) {
                        // Fallback to intercepted m3u8 if DOM extraction completely failed
                        cleanup({ src: latestM3u8, metadata: defaultMetadata }, "Fallback to intercepted network m3u8");
                    } else {
                        // In case nothing was found, delay a tiny bit more for network intercept to catch stragglers
                        setTimeout(() => {
                            if (latestM3u8) {
                                cleanup({ src: latestM3u8, metadata: defaultMetadata }, "Late intercepted network m3u8");
                            }
                        }, 2000);
                    }
                } catch (e) {
                    console.error("[VaultAuth] Injection error:", e);
                }
            };

        } catch (e) {
            console.error("[VaultAuth] Tab isolation failed:", e);
            cleanup(null, "Internal isolation error");
        }
    });
}

/**
 * Singleton Dashboard Opener
 */
async function openDashboard() {
    const url = browser.runtime.getURL('dashboard-v2.html');
    const tabs = await browser.tabs.query({ url });
    
    if (tabs.length > 0) {
        // If already open, focus the first one
        await browser.tabs.update(tabs[0].id!, { active: true });
        // Also focus the window just in case
        if (tabs[0].windowId) {
            await browser.windows.update(tabs[0].windowId, { focused: true });
        }
    } else {
        // Otherwise create new
        await browser.tabs.create({ url });
    }
}

/**
 * Message Dispatcher
 */
browser.runtime.onMessage.addListener((request: any, sender: any) => {
    if (request.action === "extract_fresh_m3u8") {
        return doTabExtraction(request.url).then(res => ({ src: res?.src || null }));
    }
    if (request.action === "open_dashboard") {
        openDashboard();
        return true;
    }
    if (request.action === "process_capture") {
        // Run extraction in background tab if link resembles video page, 
        // or just add it directly.
        return new Promise(async (resolve) => {
            try {
                const targetUrl = request.data.url;
                let finalSrc = request.data.url;

                // Simple check if we should try deep extraction
                if (!finalSrc.endsWith('.mp4') && !finalSrc.endsWith('.webm') && !finalSrc.endsWith('.m3u8')) {
                    const extracted = await doTabExtraction(targetUrl);
                    if (extracted && extracted.src) {
                        finalSrc = extracted.src;
                        
                        if (extracted.metadata) {
                            if (extracted.metadata.thumbnail) request.data.thumbnail = extracted.metadata.thumbnail;
                            if (extracted.metadata.duration) request.data.duration = extracted.metadata.duration;
                            if (extracted.metadata.title) request.data.title = extracted.metadata.title;
                            if (extracted.metadata.tags && extracted.metadata.tags.length > 0) request.data.tags = extracted.metadata.tags;
                            if (extracted.metadata.author) request.data.author = extracted.metadata.author;
                            if (extracted.metadata.views) request.data.views = extracted.metadata.views;
                            if (extracted.metadata.likes) request.data.likes = extracted.metadata.likes;
                            if (extracted.metadata.date) request.data.date = extracted.metadata.date;
                        }
                    }
                }

                request.data.rawVideoSrc = finalSrc;

                // Fallback Thumbnail: Try to grab a screenshot of the current viewport if doing an in-page capture
                // and the thumbnail is still empty
                if (!request.data.thumbnail && sender?.tab?.id) {
                    try {
                        const dataUrl = await browser.tabs.captureVisibleTab(sender.tab.windowId, { format: "jpeg", quality: 20 });
                        request.data.thumbnail = dataUrl;
                    } catch (captureErr) {
                        console.warn("[VaultAuth] Failed to capture visible tab for thumbnail", captureErr);
                    }
                }
                
                // Save to storage vault
                const saved = await getSavedVideos();
                saved.push(request.data);
                await saveVideos(saved);

                resolve({ success: true, data: request.data });
            } catch (err: any) {
                resolve({ success: false, message: err.message });
            }
        });
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
            if (tabs[0]?.id) {
                console.log("[VaultAuth] Sending shortcut command to tab", tabs[0].id);
                await browser.tabs.sendMessage(tabs[0].id, { type: "capture-video" });
            }
        } catch (error) {
            console.error("[VaultAuth] Error triggering capture-video shortcut:", error);
        }
    }
});
