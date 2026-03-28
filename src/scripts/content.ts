import browser from 'webextension-polyfill';
import { VideoData, VideoDataSchema } from '../types/schemas';

/**
 * [VaultAuth] Content Script (Modernized)
 * --------------------------------------
 * Handles DOM-based video detection, visual status indicators (Hearts),
 * and user notifications with a security-first approach.
 */

let lastHoveredElement: HTMLElement | null = null;
let mutationTimeout: ReturnType<typeof setTimeout> | null = null;

// Track the element currently under the mouse
document.addEventListener("mousemove", (e: MouseEvent) => {
    lastHoveredElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
}, { passive: true });

// Listen for Alt+X shortcut globally
document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.altKey && (e.key === "x" || e.key === "X" || e.code === "KeyX")) {

        e.preventDefault();
        e.stopPropagation();
        startCaptureFlow();
    }
}, { capture: true });

/**
 * Visual Feedback: Permanent Heart Indicator
 */
function addHeartIndicator(el: HTMLElement) {
    if (!el || el.querySelector(".vault-heart-indicator")) return;

    // Ensure relative positioning for absolute child
    const style = window.getComputedStyle(el);
    if (style.position === "static") {
        el.style.position = "relative";
    }

    const heart = document.createElement("div");
    heart.className = "vault-heart-indicator";
    
    // UI/UX Sync Icon (Cloud Check)
    heart.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" 
             style="width: 14px; height: 14px; filter: drop-shadow(0 0 4px rgba(34,197,94,0.4)); background: rgba(0,0,0,0.7); padding: 4px; border-radius: 4px;">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#22c55e"></path>
            <path d="M17.5 19l2 2 4-4" stroke="white" stroke-width="3"></path>
        </svg>
    `;

    Object.assign(heart.style, {
        position: "absolute",
        top: "4px",
        left: "4px",
        zIndex: "2147483647",
        pointerEvents: "none",
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    });

    el.appendChild(heart);
}

/**
 * Scans the page for saved videos and marks them
 */
async function highlightVaultItems() {
    try {
        const storage = await browser.storage.local.get("savedVideos");
        const savedVideos = (storage.savedVideos || []) as VideoData[];
        
        if (savedVideos.length === 0) return;

        const savedUrls = new Set(savedVideos.map((v: VideoData) => v.url));
        const links = document.querySelectorAll("a");

        links.forEach(link => {
            if (savedUrls.has(link.href)) {
                addHeartIndicator(link as HTMLElement);
            }
        });
    } catch (e) {

    }
}

/**
 * Industrial Notification System (Modernized)
 */
function showVaultNotification(type: 'success' | 'removed' | 'error' | 'processing', message: string) {
    const existing = document.getElementById("vault-notification-portal");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.id = "vault-notification-portal";
    
    // Icon Mapping
    const iconMap: Record<string, string> = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: #10b981; margin-right: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        removed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: #f97316; margin-right: 8px;"><path d="M19 12H5"></path></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: #ef4444; margin-right: 8px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
        processing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: #3b82f6; margin-right: 8px; animation: vault-spin 1s linear infinite;"><style>@keyframes vault-spin { 100% { transform: rotate(360deg); } }</style><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`
    };

    el.innerHTML = `
        <div style="display: flex; align-items: center;">
            ${iconMap[type] || iconMap.error}
            <span style="flex: 1;">${message.toUpperCase()}</span>
        </div>
    `;

    const themeMap: Record<string, { bg: string, border: string }> = {
        success: { bg: "#10b981", border: "#059669" },
        removed: { bg: "#f97316", border: "#ea580c" },
        error: { bg: "#ef4444", border: "#dc2626" },
        processing: { bg: "#3b82f6", border: "#2563eb" }
    };

    const theme = themeMap[type] || themeMap.error;

    Object.assign(el.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        padding: "14px 24px",
        borderRadius: "4px",
        borderLeft: `4px solid ${theme.border}`,
        backgroundColor: "rgba(11, 15, 25, 0.98)",
        color: "white",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "0.5px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
        zIndex: "2147483647",
        transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
        opacity: "0",
        transform: "translateX(100%)",
        pointerEvents: "none",
        backdropFilter: "blur(12px)"
    });

    document.body.appendChild(el);

    requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
    });

    // Auto-remove unless it's processing
    if (type !== 'processing') {
        setTimeout(() => {
            el.style.opacity = "0";
            el.style.transform = "translateX(100%)";
            setTimeout(() => el.remove(), 500);
        }, 4000);
    }

    // Contextual indicator updates
    if (lastHoveredElement) {
        const target = lastHoveredElement.closest("a") as HTMLElement || lastHoveredElement;
        if (type === 'success') addHeartIndicator(target);
        if (type === 'removed') {
            const heart = target.querySelector(".vault-heart-indicator");
            if (heart) heart.remove();
        }
    }
}

/**
 * Extract rich metadata from surrounding DOM nodes
 */
function extractSurroundingMetadata(baseEl: HTMLElement, existingTitle: string) {
    const meta = {
        title: existingTitle,
        author: "",
        views: "",
        likes: "",
        date: "",
        tags: [] as string[]
    };

    try {
        let container = baseEl;
        // Go up a few levels to find a good container (e.g., a card or post wrapper)
        for (let i = 0; i < 4; i++) {
            if (container.parentElement && container.parentElement !== document.body) {
                container = container.parentElement;
            }
        }

        const texts = Array.from(container.querySelectorAll('*'))
            .map(el => {
                const text = Array.from(el.childNodes)
                    .filter(node => node.nodeType === Node.TEXT_NODE)
                    .map(node => node.textContent?.trim() || '')
                    .join(' ')
                    .trim();
                return { el, text };
            })
            .filter(item => item.text.length > 0);

        for (const { el, text } of texts) {
            const lower = text.toLowerCase();

            // Tags
            if (text.startsWith('#') || lower.includes('tags:')) {
                const foundTags = text.match(/#[\w\d]+/g);
                if (foundTags) {
                    foundTags.forEach(t => {
                        if (!meta.tags.includes(t)) meta.tags.push(t);
                    });
                }
            }
            
            // Views
            if (/^\d+(?:[kKmMbB])?\s*(?:views?|plays?)$/i.test(lower)) {
                if (!meta.views) meta.views = text;
            }

            // Likes
            if (/^\d+(?:[kKmMbB])?\s*(?:likes?)$/i.test(lower)) {
                if (!meta.likes) meta.likes = text;
            }

            // Author (commonly starts with @, or is inside a link right after a thumbnail)
            if (text.startsWith('@') && text.length < 30) {
                if (!meta.author) meta.author = text;
            } else if (el.tagName === 'A' && !meta.author && text.length < 30 && !text.includes(' ')) {
                // Potential fallback author
                // meta.author = text;
            }

            // Date (e.g., "2 hours ago", "Jan 12", "2024-01-01")
            if (/(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
                if (!meta.date) meta.date = text;
            }
            
            // Heuristic Title (if it's a heading and we don't have a good one)
            if (/^H[1-4]$/.test(el.tagName)) {
                if (meta.title === "Untitled Media" || meta.title === document.title) {
                    meta.title = text;
                }
            }
        }
    } catch (err) {

    }

    return meta;
}

/**
 * Execute code in the main page context to access page globals (like jwplayer)
 */
function runInMainWorld<T>(fn: () => T): Promise<T> {
    return new Promise(resolve => {
        const script = document.createElement('script');
        const id = Math.random().toString(36).substring(7);
        script.textContent = `
            (async () => {
                try {
                    const res = await (${fn.toString()})();
                    window.postMessage({ type: 'MAIN_WORLD_RESULT', id: "${id}", result: res }, "*");
                } catch(e) {
                    window.postMessage({ type: 'MAIN_WORLD_RESULT', id: "${id}", error: e.toString() }, "*");
                }
            })();
        `;
        const listener = (e: MessageEvent) => {
            if (e.source === window && e.data && e.data.type === 'MAIN_WORLD_RESULT' && e.data.id === id) {
                window.removeEventListener('message', listener);
                script.remove();
                resolve(e.data.result);
            }
        };
        window.addEventListener('message', listener);
        document.documentElement.appendChild(script);
        // Timeout just in case
        setTimeout(() => {
            window.removeEventListener('message', listener);
            script.remove();
            resolve(null as any);
        }, 3000);
    });
}

/**
 * Reliable Data Extraction (Runtime Validated)
 */
async function attemptExtraction(el: HTMLElement | null): Promise<VideoData | Partial<VideoData>> {
    let extractedUrl: string | null = null;
    let videoEl: HTMLVideoElement | null = null;

    // Search for a video element related to the hovered tag
    if (el) {
        videoEl = (el.closest("video") || el.querySelector("video")) as HTMLVideoElement | null;
        
        if (!videoEl) {
            // Check if we are inside a video player or lightbox (like lightgallery)
            const container = el.closest('.lg-video-cont, .video-player, .plyr, .player-wrapper, [data-vjs-player]');
            if (container) {
                videoEl = container.querySelector('video');
            }
        }
    }

    // Fallback: If no direct video hovered, check if there's a dominant video on the screen
    if (!videoEl) {
        const videos = Array.from(document.querySelectorAll('video')).filter(v => {
            const rect = v.getBoundingClientRect();
            // Checking if video is relatively visible and not tiny
            return rect.width > 150 && rect.height > 150 && v.offsetParent !== null;
        });
        if (videos.length > 0) {
            videoEl = videos[0]; // grab the first prominent one
        }
    }

    if (videoEl) {
        let src = videoEl.getAttribute('src') || videoEl.currentSrc;
        if (!src && videoEl.querySelector('source')) {
            src = videoEl.querySelector('source')?.getAttribute('src') || "";
        }

        // Only use the video source if it isn't a blob (blob URLs can't be saved cross-session)
        if (src && !src.startsWith('blob:')) {
            try {
                extractedUrl = new URL(src, window.location.origin).href;
            } catch (e) {
                extractedUrl = src;
            }
        }
    }

    // Main World Media Source Check (JWPlayer, VideoJS, custom configs)
    if (!extractedUrl) {
        const mainWorldSrc = await runInMainWorld(() => {
            try {
                // JWPlayer
                // @ts-ignore
                if (typeof window.jwplayer === 'function') {
                    // @ts-ignore
                    const players = document.querySelectorAll('.jwplayer');
                    // @ts-ignore
                    const p = window.jwplayer(players.length > 0 ? players[0].id : undefined);
                    if (p && p.getPlaylist) {
                        const pl = p.getPlaylist();
                        if (pl && pl.length > 0 && pl[0].file) {
                            return pl[0].file;
                        }
                    }
                }
                
                // Video.js
                // @ts-ignore
                if (typeof window.videojs === 'function') {
                    // @ts-ignore
                    for (const playerId in window.videojs.players) {
                        // @ts-ignore
                        const player = window.videojs.players[playerId];
                        const src = player?.src();
                        if (src && !src.startsWith('blob:')) return src;
                    }
                }

                // Global variables often used by streamers
                // @ts-ignore
                if (typeof window.playerConfig !== 'undefined' && window.playerConfig.file) return window.playerConfig.file;

                return null;
            } catch (err) {
                return null;
            }
        });

        if (mainWorldSrc && typeof mainWorldSrc === 'string' && !mainWorldSrc.startsWith('blob:')) {
            try {
                extractedUrl = new URL(mainWorldSrc, window.location.origin).href;
            } catch(e) {
                extractedUrl = mainWorldSrc;
            }
        }
    }

    // Priority 2: Direct link hover if we didn't find a direct media url
    let link = el?.closest("a") as HTMLAnchorElement | null;
    
    // Priority 2: Bresenham-lite search for nearby links if not on one
    if (!link && el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Scan a small 40px radius around the element center for anchors
        const points = [
            [0,0], [15,0], [-15,0], [0,15], [0,-15],
            [30,0], [-30,0], [0,30], [0,-30]
        ];

        for (const [ox, oy] of points) {
            const potential = document.elementFromPoint(centerX + ox, centerY + oy);
            const foundLink = potential?.closest("a");
            if (foundLink) {
                link = foundLink as HTMLAnchorElement;
                break;
            }
        }
    }

// If the media element is wrapped in an anchor pointing to another page, use that as the primary URL.
      // This ensures we save the actual video page instead of returning a muted hover preview.
      let url = window.location.href;
      if (link && link.href && !link.href.startsWith("javascript:")) {
          url = link.href;
          // If we are targeting a different URL (like a gallery thumbnail), heavily favor deep extraction.
          // Discard any locally found video as it is highly likely just a teaser/preview snippet.
          if (url !== window.location.href) {
              extractedUrl = null;
          }
      } else if (extractedUrl) {
          url = extractedUrl;
      }

    let title = "Untitled Media";
    if (el) {
        title = el.getAttribute("title") || el.getAttribute("aria-label") || el.getAttribute("alt") || "";
    }
    if (!title && link) {
        title = link.getAttribute("title") || link.getAttribute("aria-label") || "";
    }
    if (!title) {
        title = document.title;
    }

    let extraMeta = { author: "", views: "", likes: "", date: "", tags: [] as string[] };
    if (el) {
        const enriched = extractSurroundingMetadata(el, title);
        title = enriched.title;
        extraMeta.author = enriched.author;
        extraMeta.views = enriched.views;
        extraMeta.likes = enriched.likes;
        extraMeta.date = enriched.date;
        extraMeta.tags = enriched.tags;
    }

    const rawData = {
        title: title.trim().substring(0, 100),
        url: url,
        thumbnail: "",
        timestamp: Date.now(),
        type: (extractedUrl ? 'video' : 'link') as "video" | "link",
        rawVideoSrc: extractedUrl || undefined,
        ...extraMeta
    };

    const result = VideoDataSchema.safeParse(rawData);
    if (!result.success) {

        return rawData;
    }
    return result.data;
}

/**
 * Visual Indicators (Spinner & Success)
 */
function addSpinnerIndicator(el: HTMLElement) {
    if (!el) return;
    removeIndicators(el);

    const style = window.getComputedStyle(el);
    if (style.position === "static") el.style.position = "relative";

    const spinner = document.createElement("div");
    spinner.className = "vault-spinner-indicator";
    spinner.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" 
             style="width: 24px; height: 24px; animation: spin 1s linear infinite; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8));">
            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
    `;

    Object.assign(spinner.style, {
        position: "absolute",
        top: "8px",
        left: "8px",
        zIndex: "2147483647",
        pointerEvents: "none"
    });

    el.appendChild(spinner);
}

function removeIndicators(el: HTMLElement) {
    const spinner = el.querySelector(".vault-spinner-indicator");
    if (spinner) spinner.remove();
}

/**
 * Capture Flow Execution
 */
async function startCaptureFlow() {
    let target = lastHoveredElement;
    if (!target) {
        showVaultNotification("error", "No element focused");
        return;
    }

    const anchor = target.closest("a") as HTMLAnchorElement | null;
    const mediaContainer = target.closest("video, img, iframe, .video-player") as HTMLElement | null;
    
    const uiTarget = anchor || mediaContainer || target;
    if (uiTarget) addSpinnerIndicator(uiTarget as HTMLElement);

    const data = await attemptExtraction(target);
    if (!data || !data.url) {
        if (uiTarget) removeIndicators(uiTarget as HTMLElement);
        showVaultNotification("error", "Could not identify content");
        return;
    }

    showVaultNotification("processing", `Infiltrating: ${data.title?.substring(0, 20)}...`);

    try {
        const response = (await browser.runtime.sendMessage({ 
            action: "process_capture", 
            data 
        })) as { success: boolean, message?: string };

        if (uiTarget) removeIndicators(uiTarget as HTMLElement);

        if (response && response.success) {
            showVaultNotification("success", "Item secured in vault");
            if (uiTarget) addHeartIndicator(uiTarget as HTMLElement);
        } else {
            showVaultNotification("error", response?.message || "Capture operation failed");
        }
    } catch (e) {

        if (uiTarget) removeIndicators(uiTarget as HTMLElement);
        showVaultNotification("error", "Communication error with background.");
    }
}

/**
 * Message Handlers
 */
browser.runtime.onMessage.addListener((request: any) => {
    if (request.action === "get_video_data") {

        return Promise.resolve(attemptExtraction(lastHoveredElement));
    }
    
    if (request.action === "show_notification" || request.type === "show_notification") {
        showVaultNotification(request.notificationType || request.type, request.message);
        return Promise.resolve(true);
    }

    if (request.type === "capture-video" || request.action === "capture-video") {

        startCaptureFlow();
        return Promise.resolve(true);
    }
    return undefined;
});

// Initialization
const observer = new MutationObserver(() => {
    if (mutationTimeout) clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(highlightVaultItems, 1200);
});

if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    highlightVaultItems();
} else {
    window.addEventListener("DOMContentLoaded", () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            highlightVaultItems();
        }
    });
}

// Window message listener for cross-context or test triggering
window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data && event.data.action === "capture-video") {

        startCaptureFlow();
    }
});
