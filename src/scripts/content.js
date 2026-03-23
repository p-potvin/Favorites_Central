import browser from 'webextension-polyfill';
import { VideoDataSchema } from '../types/schemas';
/**
 * [VaultAuth] Content Script (Modernized)
 * --------------------------------------
 * Handles DOM-based video detection, visual status indicators (Hearts),
 * and user notifications with a security-first approach.
 */
let lastHoveredElement = null;
let mutationTimeout = null;
// Track the element currently under the mouse
document.addEventListener("mousemove", (e) => {
    lastHoveredElement = document.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });
/**
 * Visual Feedback: Permanent Heart Indicator
 */
function addHeartIndicator(el) {
    if (!el || el.querySelector(".vault-heart-indicator"))
        return;
    // Ensure relative positioning for absolute child
    const style = window.getComputedStyle(el);
    if (style.position === "static") {
        el.style.position = "relative";
    }
    const heart = document.createElement("div");
    heart.className = "vault-heart-indicator";
    // Industrial-Cyber SVG Design
    heart.innerHTML = `
        <svg viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="1.5" 
             style="width: 16px; height: 16px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5)); display: block;">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
        const savedVideos = (storage.savedVideos || []);
        if (savedVideos.length === 0)
            return;
        const savedUrls = new Set(savedVideos.map((v) => v.url));
        const links = document.querySelectorAll("a");
        links.forEach(link => {
            if (savedUrls.has(link.href)) {
                addHeartIndicator(link);
            }
        });
    }
    catch (e) {
        console.error("[VaultAuth] Highlight failure:", e);
    }
}
/**
 * Industrial Notification System
 */
function showVaultNotification(type, message) {
    const existing = document.getElementById("vault-notification-portal");
    if (existing)
        existing.remove();
    const el = document.createElement("div");
    el.id = "vault-notification-portal";
    el.textContent = `[VAULT] ${message}`;
    const themeMap = {
        success: { bg: "#10b981", border: "#059669" },
        removed: { bg: "#f97316", border: "#ea580c" },
        error: { bg: "#ef4444", border: "#dc2626" }
    };
    const theme = themeMap[type] || themeMap.error;
    Object.assign(el.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        padding: "12px 20px",
        borderRadius: "4px",
        borderLeft: `4px solid ${theme.border}`,
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        color: "white",
        fontSize: "13px",
        fontWeight: "600",
        fontFamily: "'Courier New', monospace",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        zIndex: "999999",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: "0",
        transform: "translateX(50px)",
        pointerEvents: "none"
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
    });
    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateX(50px)";
        setTimeout(() => el.remove(), 400);
    }, 3500);
    // Contextual indicator updates
    if (lastHoveredElement) {
        const target = lastHoveredElement.closest("a") || lastHoveredElement;
        if (type === 'success')
            addHeartIndicator(target);
        if (type === 'removed') {
            const heart = target.querySelector(".vault-heart-indicator");
            if (heart)
                heart.remove();
        }
    }
}
/**
 * Extract rich metadata from surrounding DOM nodes
 */
function extractSurroundingMetadata(baseEl, existingTitle) {
    const meta = {
        title: existingTitle,
        author: "",
        views: "",
        likes: "",
        date: "",
        tags: []
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
                        if (!meta.tags.includes(t))
                            meta.tags.push(t);
                    });
                }
            }
            // Views
            if (/^\d+(?:[kKmMbB])?\s*(?:views?|plays?)$/i.test(lower)) {
                if (!meta.views)
                    meta.views = text;
            }
            // Likes
            if (/^\d+(?:[kKmMbB])?\s*(?:likes?)$/i.test(lower)) {
                if (!meta.likes)
                    meta.likes = text;
            }
            // Author (commonly starts with @, or is inside a link right after a thumbnail)
            if (text.startsWith('@') && text.length < 30) {
                if (!meta.author)
                    meta.author = text;
            }
            else if (el.tagName === 'A' && !meta.author && text.length < 30 && !text.includes(' ')) {
                // Potential fallback author
                // meta.author = text;
            }
            // Date (e.g., "2 hours ago", "Jan 12", "2024-01-01")
            if (/(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
                if (!meta.date)
                    meta.date = text;
            }
            // Heuristic Title (if it's a heading and we don't have a good one)
            if (/^H[1-4]$/.test(el.tagName)) {
                if (meta.title === "Untitled Media" || meta.title === document.title) {
                    meta.title = text;
                }
            }
        }
    }
    catch (err) {
        console.warn("[VaultAuth] Failed to extract surrounding metadata", err);
    }
    return meta;
}
/**
 * Reliable Data Extraction (Runtime Validated)
 */
function attemptExtraction(el) {
    const link = el?.closest("a");
    const url = link?.href || window.location.href;
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
    let extraMeta = { author: "", views: "", likes: "", date: "", tags: [] };
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
        ...extraMeta
    };
    const result = VideoDataSchema.safeParse(rawData);
    if (!result.success) {
        console.warn("[VaultAuth] Extraction validation failed:", result.error);
        return rawData;
    }
    return result.data;
}
/**
 * Visual Indicators (Spinner & Success)
 */
function addSpinnerIndicator(el) {
    if (!el)
        return;
    removeIndicators(el);
    const style = window.getComputedStyle(el);
    if (style.position === "static")
        el.style.position = "relative";
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
function removeIndicators(el) {
    const spinner = el.querySelector(".vault-spinner-indicator");
    if (spinner)
        spinner.remove();
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
    const anchor = target.closest("a");
    const mediaContainer = target.closest("video, img, iframe, .video-player");
    const uiTarget = anchor || mediaContainer || target;
    if (uiTarget)
        addSpinnerIndicator(uiTarget);
    const data = attemptExtraction(target);
    if (!data || !data.url) {
        if (uiTarget)
            removeIndicators(uiTarget);
        showVaultNotification("error", "Could not identify link");
        return;
    }
    showVaultNotification("success", "Processing capture...");
    try {
        const response = (await browser.runtime.sendMessage({
            action: "process_capture",
            data
        }));
        if (uiTarget)
            removeIndicators(uiTarget);
        if (response && response.success) {
            showVaultNotification("success", "Saved successfully!");
            if (uiTarget)
                addHeartIndicator(uiTarget);
        }
        else {
            showVaultNotification("error", response?.message || "Failed to capture source.");
        }
    }
    catch (e) {
        console.error("[VaultAuth] Capture flow failed:", e);
        if (uiTarget)
            removeIndicators(uiTarget);
        showVaultNotification("error", "Communication error with background.");
    }
}
/**
 * Message Handlers
 */
browser.runtime.onMessage.addListener((request) => {
    if (request.action === "get_video_data") {
        console.log("[VaultAuth] Triggering extraction from DOM...");
        return Promise.resolve(attemptExtraction(lastHoveredElement));
    }
    if (request.action === "show_notification" || request.type === "show_notification") {
        showVaultNotification(request.notificationType || request.type, request.message);
        return Promise.resolve(true);
    }
    if (request.type === "capture-video" || request.action === "capture-video") {
        console.log("[VaultAuth] Capture video shortcut triggered");
        startCaptureFlow();
        return Promise.resolve(true);
    }
    return undefined;
});
// Initialization
const observer = new MutationObserver(() => {
    if (mutationTimeout)
        clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(highlightVaultItems, 1200);
});
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    highlightVaultItems();
}
else {
    window.addEventListener("DOMContentLoaded", () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            highlightVaultItems();
        }
    });
}
