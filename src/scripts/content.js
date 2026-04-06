import browser from 'webextension-polyfill';
import { VideoDataSchema } from '../types/schemas';
import { STORAGE_KEYS, NOTIFICATION_CONFIG } from '../lib/constants';
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
// Listen for Alt+X shortcut globally
document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "x" || e.key === "X" || e.code === "KeyX")) {
        console.log("[VaultAuth] Alt+X shortcut detected");
        e.preventDefault();
        e.stopPropagation();
        startCaptureFlow();
    }
}, { capture: true });
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
    // UI/UX Sync Icon (Cloud Check)
    heart.innerHTML = `
        <style>
            .vault-heart-indicator svg {
                width: 14px;
                height: 14px;
                background: #22c55e;
                padding: 4px;
                border-radius: 4px;
                fill: white;
                stroke: white;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .vault-heart-indicator:hover svg {
                border: 2px dashed white;
                padding: 2px;
            }
        </style>
        <svg viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
    `;
    Object.assign(heart.style, {
        position: "absolute",
        top: "4px",
        left: "4px",
        zIndex: "2147483647",
        pointerEvents: "auto",
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    });
    el.appendChild(heart);
}
/**
 * Scans the page for saved videos and marks them
 */
async function highlightVaultItems() {
    try {
        const storage = await browser.storage.local.get(STORAGE_KEYS.SAVED_VIDEOS);
        const savedVideos = (storage[STORAGE_KEYS.SAVED_VIDEOS] || []);
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
 * Industrial Notification System (Modernized)
 */
const activeNotifications = new Map();
const MAX_CONCURRENT_NOTIFICATIONS = 10;
function showVaultNotification(type, message, id) {
    const portalId = id || `vault-notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    // If we have an existing notification with this ID (e.g. updating processing -> success), reuse it
    let el = activeNotifications.get(portalId);
    const isUpdate = !!el;
    if (!el) {
        // Enforce maximum concurrent notifications
        if (activeNotifications.size >= MAX_CONCURRENT_NOTIFICATIONS) {
            const result = activeNotifications.keys().next();
            const oldestKey = result.value;
            if (oldestKey !== undefined) {
                const oldestEl = activeNotifications.get(oldestKey);
                if (oldestEl) {
                    oldestEl.remove();
                    activeNotifications.delete(oldestKey);
                }
            }
        }
        el = document.createElement("div");
        el.id = portalId;
        activeNotifications.set(portalId, el);
        document.body.appendChild(el);
    }
    // Icon Mapping
    const iconMap = {
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
    const themeMap = {
        success: { bg: "#10b981", border: "#059669" },
        removed: { bg: "#f97316", border: "#ea580c" },
        error: { bg: "#ef4444", border: "#dc2626" },
        processing: { bg: "#3b82f6", border: "#2563eb" }
    };
    const theme = themeMap[type] || themeMap.error;
    // Calculate vertical offset based on position in map
    const entries = Array.from(activeNotifications.entries());
    const index = entries.findIndex(([id]) => id === portalId);
    // Fallback if not found yet (newly created)
    const renderIndex = index === -1 ? activeNotifications.size - 1 : index;
    const bottomOffset = 24 + (renderIndex * NOTIFICATION_CONFIG.STACK_OFFSET);
    Object.assign(el.style, {
        position: "fixed",
        bottom: `${bottomOffset}px`,
        right: "24px",
        padding: "14px 24px",
        height: "50px",
        boxSizing: "border-box",
        borderRadius: "4px",
        borderLeft: `4px solid ${theme.border}`,
        backgroundColor: "rgba(11, 15, 25, 0.98)",
        color: "white",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "0.5px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
        zIndex: NOTIFICATION_CONFIG.Z_INDEX.toString(),
        transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
        opacity: isUpdate ? "1" : "0",
        transform: isUpdate ? "translateX(0)" : "translateX(100%)",
        pointerEvents: "none",
        backdropFilter: "blur(12px)"
    });
    if (!isUpdate) {
        requestAnimationFrame(() => {
            if (el) {
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
            }
        });
    }
    // Auto-remove unless it's processing
    if (type !== 'processing') {
        setTimeout(() => {
            if (activeNotifications.has(portalId)) {
                const currentEl = activeNotifications.get(portalId);
                if (currentEl) {
                    currentEl.style.opacity = "0";
                    currentEl.style.transform = "translateX(100%)";
                    setTimeout(() => {
                        currentEl.remove();
                        activeNotifications.delete(portalId);
                        // Shift others down
                        updateNotificationOffsets();
                    }, 500);
                }
            }
        }, NOTIFICATION_CONFIG.DURATION);
    }
    // Contextual indicator updates
    const target = portalId?.startsWith('capture-') ? null : (lastHoveredElement?.closest("a") || lastHoveredElement);
    if (type === 'success' && target)
        addHeartIndicator(target);
    if (type === 'removed' && target) {
        const heart = target.querySelector(".vault-heart-indicator");
        if (heart)
            heart.remove();
    }
}
function updateNotificationOffsets() {
    Array.from(activeNotifications.entries()).forEach(([id, el], index) => {
        const bottomOffset = 24 + (index * NOTIFICATION_CONFIG.STACK_OFFSET);
        el.style.bottom = `${bottomOffset}px`;
    });
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
        tags: [],
        actors: []
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
            // Date (e.g., "2 hours ago", "Jan 12", "2024-01-01") vs Actors
            const isStrictDate = /(?:\d+\s+(?:min|hour|day|week|month|year)s?\s+ago)|(?:yesterday|today)|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}|^\d{4}[-/]\d{2}[-/]\d{2}$/i.test(text);
            const isOldSloppyDate = /(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower);
            if (isStrictDate && text.length < 20) {
                if (!meta.date)
                    meta.date = text;
            }
            else if (isOldSloppyDate && text.length < 30) {
                // Previously, names like "Julia" or "Mark" got caught here. If it's not a strict date, it's likely an actor.
                if (!meta.actors.includes(text))
                    meta.actors.push(text);
            }
            else if (el.tagName === 'A' && text.split(' ').length <= 3 && text.length > 2 && text.length < 25 && !text.startsWith('#') && !text.startsWith('@')) {
                const hint = (el.className + ' ' + el.getAttribute('href')).toLowerCase();
                if (hint.includes('model') || hint.includes('actor') || hint.includes('pornstar') || hint.includes('/star/')) {
                    if (!meta.actors.includes(text))
                        meta.actors.push(text);
                }
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
const VIDEO_EXTS_RE = /\.(mp4|webm|mkv|m3u8|ts|mov|avi|flv|ogv)(\?.*)?$/i;
const MEDIA_EXTS_RE = /\.(jpg|jpeg|png|gif|webp|mp3|wav|flac|ogg|torrent)(\?.*)?$/i;
/**
 * Scores a URL by how likely it is to be a useful video/media source.
 * Higher is better. Returns 0 for empty/data: URLs.
 */
function scoreUrl(url) {
    if (!url || url.startsWith('data:') || url.startsWith('javascript:') || url === '#')
        return 0;
    const lower = url.toLowerCase();
    if (VIDEO_EXTS_RE.test(lower))
        return 100;
    if (lower.includes('.m3u8') || lower.includes('manifest'))
        return 90;
    if (lower.includes('video') || lower.includes('stream') || lower.includes('/media/'))
        return 60;
    if (lower.match(MEDIA_EXTS_RE))
        return 30;
    if (lower.startsWith('http') || lower.startsWith('/'))
        return 20;
    return 5;
}
/**
 * Reads the best URL out of a single DOM element by checking href, src and then
 * any attribute whose value looks like an absolute or relative URL.
 */
function getElementUrl(el) {
    const href = el.getAttribute('href');
    const src = el.getAttribute('src');
    if (href && href !== '#' && !href.startsWith('javascript:'))
        return href;
    if (src && !src.startsWith('data:'))
        return src;
    // Custom attributes: absolute https:// URL or relative path with multiple segments
    for (const attr of Array.from(el.attributes)) {
        const val = attr.value;
        if ((val.startsWith('https://') || val.startsWith('http://')) && val.length > 10)
            return val;
        if (val.startsWith('/') && val.split('/').length >= 3)
            return val;
    }
    return null;
}
/**
 * Searches for the best media/video link using this priority order:
 *   1. The element itself
 *   2. The immediate parent
 *   3. Children of the original element
 *   4. Further parents (up the ancestor chain)
 *   5. Immediate siblings
 *
 * Candidates are scored and the highest score wins.
 *
 * Score components:
 *   <video> element               tag bonus +200
 *   <source> element              tag bonus +150
 *   URL with video file extension url score +100
 *   URL with streaming manifest   url score +90
 *   <a> tag                       tag bonus 0 (neutral)
 *   <img> tag                     tag bonus –30
 *   other element                 tag bonus –50
 */
function findBestLink(baseEl) {
    const candidates = [];
    function addCandidate(el, baseScore) {
        const tag = el.tagName.toLowerCase();
        const tagBonus = { video: 200, source: 150, a: 0, img: -30, audio: -20 };
        const bonus = tagBonus[tag] ?? -50;
        let url = null;
        if (tag === 'video') {
            const v = el;
            url = (v.currentSrc && !v.currentSrc.startsWith('blob:') ? v.currentSrc : null)
                || (v.src && !v.src.startsWith('blob:') ? v.src : null)
                || getElementUrl(el);
        }
        else if (tag === 'source') {
            const s = el;
            url = (s.src && !s.src.startsWith('blob:') ? s.src : null) || getElementUrl(el);
        }
        else {
            url = getElementUrl(el);
        }
        if (!url)
            return;
        // Resolve protocol-relative and absolute paths
        if (url.startsWith('//'))
            url = window.location.protocol + url;
        if (url.startsWith('/'))
            url = window.location.origin + url;
        const score = baseScore + bonus + scoreUrl(url);
        if (score > 0)
            candidates.push({ url, score, el });
    }
    // 1. The element itself (highest priority)
    addCandidate(baseEl, 100);
    // 2. Immediate parent
    const immediateParent = baseEl.parentElement;
    if (immediateParent && immediateParent !== document.body) {
        addCandidate(immediateParent, 80);
    }
    // 3. Children of the original element
    baseEl.querySelectorAll('a, video, source, [href], [src]').forEach(child => addCandidate(child, 60));
    // 4. Further parents (ancestor chain, skipping the immediate parent already added)
    let ancestor = immediateParent?.parentElement ?? null;
    let ancestorScore = 50;
    for (let depth = 0; depth < 5 && ancestor && ancestor !== document.body; depth++) {
        addCandidate(ancestor, ancestorScore);
        ancestor = ancestor.parentElement;
        ancestorScore -= 5;
    }
    // 5. Immediate siblings (direct children of the immediate parent that are not the base element)
    if (immediateParent) {
        Array.from(immediateParent.children).forEach(sibling => {
            if (sibling !== baseEl) {
                addCandidate(sibling, 30);
                sibling.querySelectorAll('a, video, source').forEach(child => addCandidate(child, 25));
            }
        });
    }
    if (candidates.length === 0)
        return null;
    candidates.sort((a, b) => b.score - a.score);
    return { url: candidates[0].url, el: candidates[0].el };
}
/**
 * Reliable Data Extraction (Runtime Validated)
 */
function attemptExtraction(el) {
    const best = el ? findBestLink(el) : null;
    let url = best?.url || window.location.href;
    let title = "Untitled Media";
    if (el) {
        title = el.getAttribute("title") || el.getAttribute("aria-label") || el.getAttribute("alt") || "";
    }
    if (!title && best?.el) {
        title = best.el.getAttribute?.("title")
            || best.el.getAttribute?.("aria-label")
            || "";
    }
    if (!title)
        title = document.title;
    let extraMeta = { author: "", views: "", likes: "", date: "", tags: [], actors: [] };
    if (el) {
        const enriched = extractSurroundingMetadata(el, title);
        title = enriched.title;
        extraMeta.author = enriched.author;
        extraMeta.views = enriched.views;
        extraMeta.likes = enriched.likes;
        extraMeta.date = enriched.date;
        extraMeta.tags = enriched.tags;
        extraMeta.actors = enriched.actors;
    }
    let type = 'link';
    if (best?.el) {
        const tag = best.el.tagName.toLowerCase();
        if (tag === 'video' || tag === 'source')
            type = 'video';
        else if (tag === 'img')
            type = 'image';
        else if (tag === 'audio')
            type = 'audio';
    }
    if (type === 'link') {
        const bare = url.split('?')[0];
        if (bare.match(/\.(mp4|webm|mkv|m3u8|ts|mov|flv|ogv)$/i))
            type = 'video';
        else if (bare.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            type = 'image';
        else if (bare.match(/\.(mp3|wav|flac|ogg)$/i))
            type = 'audio';
        else if (bare.match(/\.torrent$/i) || url.startsWith('magnet:'))
            type = 'torrent';
    }
    const rawData = {
        title: title.trim().substring(0, 100),
        url,
        domain: window.location.hostname.replace('www.', ''),
        type,
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
        showVaultNotification("error", "Could not identify content");
        return;
    }
    const notificationId = `capture-${Date.now()}`;
    showVaultNotification("processing", `Infiltrating: ${data.title?.substring(0, 20)}...`, notificationId);
    try {
        const response = (await browser.runtime.sendMessage({
            action: "process_capture",
            data
        }));
        if (uiTarget)
            removeIndicators(uiTarget);
        if (response && response.success) {
            showVaultNotification("success", "Item secured in vault", notificationId);
            if (uiTarget)
                addHeartIndicator(uiTarget);
        }
        else {
            showVaultNotification("error", response?.message || "Capture operation failed", notificationId);
        }
    }
    catch (e) {
        console.error("[VaultAuth] Capture flow failed:", e);
        if (uiTarget)
            removeIndicators(uiTarget);
        showVaultNotification("error", "Communication error with background.", notificationId);
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
// Window message listener for cross-context or test triggering
window.addEventListener("message", (event) => {
    if (event.source !== window)
        return;
    if (event.data && event.data.action === "capture-video") {
        console.log("[VaultAuth] Capture video triggered via window message");
        startCaptureFlow();
    }
});
