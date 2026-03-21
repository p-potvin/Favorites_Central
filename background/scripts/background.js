/**
 * Performs a background extraction of video sources from a target URL.
 * Uses a temporary hidden tab to intercept network requests and run injection logic.
 * @param {string} targetUrl The URL to scrape.
 * @returns {Promise<string|null>} The extracted media URL or null.
 */
async function doTabExtraction(targetUrl) {
    console.log("[doTabExtraction] Starting for:", targetUrl);
    let scraperTabId = null;
    let webRequestListener = null;
    let tabUpdateListener = null;
    let globalTimeoutId = null;

    // Use a Promise wrapper to manage the lifecycle of listeners and the temporary tab.
    const extractedFromTab = await new Promise(async (resolve) => {
        let isResolved = false;
        let latestM3u8 = null;
        let injectionStarted = false;

        /**
         * Final cleanup function to ensure no listeners or tabs are leaked.
         */
        const cleanup = (result, reason) => {
            if (isResolved) return;
            isResolved = true;

            console.log(`[doTabExtraction] Cleanup: ${reason}. TabID: ${scraperTabId}`);

            if (globalTimeoutId) clearTimeout(globalTimeoutId);

            if (webRequestListener && browser.webRequest) {
                browser.webRequest.onBeforeRequest.removeListener(webRequestListener);
            }
            if (tabUpdateListener && browser.tabs) {
                browser.tabs.onUpdated.removeListener(tabUpdateListener);
            }

            if (scraperTabId) {
                browser.tabs.remove(scraperTabId).catch(() => { /* ignore if already closed */ });
            }

            resolve(result);
        };

        try {
            // Create the scraper tab. active: false ensures it doesn't take focus.
            const scraperTab = await browser.tabs.create({ url: targetUrl, active: false, pinned: false });
            scraperTabId = scraperTab.id;

            // Global 16s timeout for the entire extraction process
            globalTimeoutId = setTimeout(() => {
                cleanup(latestM3u8 || null, "Global timeout (16s)");
            }, 16000);

            // 1. Attach Network Interceptor for .m3u8 files
            if (browser.webRequest) {
                webRequestListener = (details) => {
                    if (details.tabId === scraperTabId && details.url.includes('.m3u8')) {
                        console.log("[doTabExtraction] Intercepted m3u8:", details.url);
                        latestM3u8 = details.url;
                    }
                };
                browser.webRequest.onBeforeRequest.addListener(
                    webRequestListener,
                    { urls: ["<all_urls>"], tabId: scraperTabId },
                    []
                );
            }

            /**
             * Primary extraction logic to be injected into the scraper tab.
             */
            const injectScript = async () => {
                if (injectionStarted || isResolved) return;
                injectionStarted = true;

                try {
                    const scripting = typeof browser !== 'undefined' && browser.scripting ? browser.scripting : chrome.scripting;
                    
                    const extractionLogic = () => {
                        return new Promise((res) => {
                            const frameId = Date.now().toString(36);
                            
                            const getMediaSource = () => {
                                // Direct video search
                                const v = document.querySelector('video');
                                if (v && v.src && !v.src.startsWith('blob:')) return v.src;
                                
                                const s = document.querySelector('video source');
                                if (s && s.src && !s.src.startsWith('blob:')) return s.src;

                                // Look for media in same-origin iframes
                                const frames = document.querySelectorAll('iframe');
                                for (const f of frames) {
                                    try {
                                        const doc = f.contentDocument || f.contentWindow.document;
                                        const subV = doc.querySelector('video');
                                        if (subV && subV.src && !subV.src.startsWith('blob:')) return subV.src;
                                    } catch(e) {} 
                                }
                                return null;
                            };

                            const tryInteractions = () => {
                                // Broad click on common player selectors to trigger loading
                                const selectors = [
                                    '[class*="player" i]', '[id*="player" i]', 
                                    '[class*="play" i]', '[id*="play" i]', 
                                    '[aria-label*="play" i]', '.vjs-big-play-button',
                                    'video', 'canvas'
                                ];
                                selectors.forEach(sel => {
                                    document.querySelectorAll(sel).forEach(el => {
                                        try { el.click(); } catch(e) {}
                                    });
                                });
                                // Center-of-screen click
                                try {
                                    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
                                    if (el) el.click();
                                } catch(e) {}
                            };
                                                            
                            const observer = new MutationObserver(() => {
                                const src = getMediaSource();
                                if (src) {
                                    observer.disconnect();
                                    res(src);
                                }
                            });
                            observer.observe(document.body || document.documentElement, { 
                                childList: true, subtree: true, attributes: true, attributeFilter: ['src']
                            });

                            // Sequential interaction attempts
                            setTimeout(tryInteractions, 1000);
                            setTimeout(tryInteractions, 3000);
                            setTimeout(tryInteractions, 6000);

                            // In-page fallback timeout
                            setTimeout(() => {
                                observer.disconnect();
                                res(getMediaSource());
                            }, 12000);
                        });
                    };

                    let results;
                    try {
                        results = await scripting.executeScript({
                            target: { tabId: scraperTabId, allFrames: true },
                            world: "MAIN",
                            func: extractionLogic
                        });
                    } catch (e) {
                        // Fallback if allFrames: true fails due to permissions
                        results = await scripting.executeScript({
                            target: { tabId: scraperTabId, allFrames: false },
                            world: "MAIN",
                            func: extractionLogic
                        });
                    }

                    let scriptResult = null;
                    if (results && results.length > 0) {
                        const validFrameResult = results.find(r => typeof r.result === 'string' && r.result.length > 0);
                        if (validFrameResult) scriptResult = validFrameResult.result;
                    }

                    // Prioritize intercepted network requests over DOM results
                    cleanup(latestM3u8 || scriptResult || null, "Injected script completed");
                } catch (err) {
                    cleanup(latestM3u8 || null, "Injection error: " + err.message);
                }
            };
            
            // 2. Tab Lifecycle Listeners
            tabUpdateListener = (tabId, info) => {
                if (tabId === scraperTabId && info.status === 'complete') {
                    injectScript();
                }
            };
            browser.tabs.onUpdated.addListener(tabUpdateListener);

            // Safety trigger: if tab is still 'loading' after 6 seconds, try injecting anyway.
            setTimeout(() => {
                if (!injectionStarted && !isResolved) {
                    injectScript();
                }
            }, 6000);

            // Immediate check in case tab is already complete
            const tabInfo = await browser.tabs.get(scraperTabId);
            if (tabInfo && tabInfo.status === 'complete') {
                injectScript();
            }

        } catch (e) {
            cleanup(null, "Initial setup error: " + e.message);
        }
    });

    return extractedFromTab;
}

/**
 * Handle action button click (opens dashboard in a full tab)
 */
browser.action.onClicked.addListener(() => {
    browser.tabs.create({ url: "dashboard.html" });
});

/**
 * Handle commands (shortcuts)
 */
browser.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
        browser.tabs.create({ url: "dashboard.html" });
    }
});

/**
 * Handle messages from the dashboard (content logic)
 */
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractMedia') {
        const targetUrl = request.url;
        console.log("[background] Extracting media for:", targetUrl);
        
        doTabExtraction(targetUrl).then(result => {
           console.log("[background] Final Extraction Result:", result);
           sendResponse({ success: !!result, mediaUrl: result });
        }).catch(err => {
           console.error("[background] Extraction failure:", err);
           sendResponse({ success: false, error: err.message });
        });

        return true; // Keep the message channel open for async response
    }

    if (request.action === "extract_fresh_m3u8") {
        console.log("[background] Extracting fresh m3u8 for:", request.url);
        doTabExtraction(request.url).then(result => {
            sendResponse({ src: result });
        }).catch(() => {
            sendResponse({ src: null });
        });
        return true;
    }

    if (request.action === "fetch_html") {
        fetch(request.url)
            .then(r => r.text())
            .then(html => sendResponse({ html }))
            .catch(err => sendResponse({ error: err.message }));
        return true;
    }
});
