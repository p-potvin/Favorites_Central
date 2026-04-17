import browser from 'webextension-polyfill';
import { STORAGE_KEYS, NOTIFICATION_CONFIG } from '../lib/constants';
/**
 * Vault Central – Content Script (Thumbnail-First)
 * -------------------------------------------------
 * Core design principle: the user is **hovering over a thumbnail** when they
 * press Alt+X.  Every decision flows from that starting point:
 *
 *   1. Identify the thumbnail element (img / background-image / video poster)
 *   2. Walk UP the DOM to find the enclosing <a> (the link to the video page)
 *   3. Extract metadata from the surrounding card/container
 *   4. Send everything to the background script for processing
 *
 * This "thumbnail-first" approach is the opposite of the previous "find a
 * <video> element" strategy and works far better for browsing/listing pages
 * where video thumbnails are everywhere but <video> elements are rare.
 */
const LOG = "[Vault:content]";
// ─── State ──────────────────────────────────────────────────────────────────
let lastHoveredElement = null;
let mutationTimeout = null;
<<<<<<< Updated upstream
// ─── Mouse Tracking ─────────────────────────────────────────────────────────
=======
const videoNodes = [];
const imgNodes = [];
const registeredVideos = new WeakSet();
const registeredImgs = new WeakSet();
function addVideoNode(el) {
    if (registeredVideos.has(el))
        return;
    registeredVideos.add(el);
    const src = el.src || el.querySelector('source')?.src || '';
    videoNodes.push({ element: el, src });
    console.log(`${LOG_PREFIX} addVideoNode: registered <video> src="${src.substring(0, 60)}"`);
}
function addImgNode(el) {
    if (registeredImgs.has(el))
        return;
    registeredImgs.add(el);
    const src = el.src || '';
    imgNodes.push({ element: el, src });
    console.log(`${LOG_PREFIX} addImgNode: registered <img> src="${src.substring(0, 60)}"`);
}
function gatherMediaNodes() {
    document.querySelectorAll('video').forEach(addVideoNode);
    document.querySelectorAll('img').forEach(addImgNode);
    console.log(`${LOG_PREFIX} gatherMediaNodes: ${videoNodes.length} video(s), ${imgNodes.length} img(s) registered.`);
}
>>>>>>> Stashed changes
document.addEventListener("mousemove", (e) => {
    lastHoveredElement = document.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });
// ─── Shortcut Handler ───────────────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "x" || e.key === "X" || e.code === "KeyX")) {
        console.log(LOG, "Alt+X detected. target:", lastHoveredElement?.tagName);
        e.preventDefault();
        e.stopPropagation();
        startCaptureFlow();
    }
}, { capture: true });
// ─── URL Scoring ────────────────────────────────────────────────────────────
/** Scores a URL for how likely it is to be a direct video or video page. */
function scoreUrl(url) {
    if (!url || url.startsWith('javascript:'))
        return -1;
    const lower = url.toLowerCase();
    let score = 0;
    // Direct video file extensions
    if (/\.(mp4|webm|mkv|flv|mov|m3u8|ts|avi|wmv)(\?|$)/.test(lower))
        score += 1000;
    // Known video platforms
    if (/(youtube\.com\/watch|youtu\.be\/|vimeo\.com\/\d|tiktok\.com|twitch\.tv|dailymotion\.com\/video|pornhub|xvideos|xhamster|redtube|spankbang|xnxx)/.test(lower))
        score += 500;
    // Generic media path segments
    if (/(\/video[s]?\/|\/watch\/|\/player\/|\/embed\/|\/clip[s]?\/|\/media\/|\/vod\/)/.test(lower))
        score += 200;
    // Query params that usually indicate video
    if (/[?&](v|video|id|clip)=/.test(lower))
        score += 100;
    // Penalize obviously non-video links
    if (/\/(tag|categor|search|user|channel|login|signup|about|terms|privacy|faq)[s]?(\/|$|\?)/.test(lower))
        score -= 300;
    return score;
}
// ─── Thumbnail Detection ────────────────────────────────────────────────────
/**
 * Given the element under the cursor, find the best thumbnail source.
 * Walks from the element itself outward through ancestors.
 *
 * Returns `{ src, element }` where `element` is the DOM node that IS the
 * thumbnail, and `src` is either an image URL or a data-URL frame capture.
 */
function findThumbnail(el) {
    if (!el)
        return { src: null, element: null };
    // Case 1: The element itself is an <img>
    if (el.tagName === 'IMG') {
        const src = el.src || el.currentSrc;
        if (src)
            return { src, element: el };
    }
    // Case 2: The element is a <video> (inline player in a listing)
    if (el.tagName === 'VIDEO') {
        return { src: captureVideoFrame(el), element: el };
    }
    // Case 3: The element has a CSS background-image (very common for thumbnails)
    const bgSrc = getBackgroundImageUrl(el);
    if (bgSrc)
        return { src: bgSrc, element: el };
    // Case 4: Walk upward through ancestors looking for a thumbnail container.
    //         Many sites wrap thumbnails in divs; the <img> is a child.
    let current = el;
    const maxDepth = 6; // don't walk too far
    for (let i = 0; i < maxDepth && current; i++) {
        // Check for <img> children
        const img = current.querySelector('img');
        if (img && img.src)
            return { src: img.src, element: img };
        // Check for <video> children (e.g., hover previews on some sites)
        const video = current.querySelector('video');
        if (video)
            return { src: captureVideoFrame(video), element: video };
        // Check for background-image on this ancestor
        const ancestorBg = getBackgroundImageUrl(current);
        if (ancestorBg)
            return { src: ancestorBg, element: current };
        current = current.parentElement;
    }
    return { src: null, element: null };
}
/** Extracts a URL from an element's computed `background-image` style. */
function getBackgroundImageUrl(el) {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none')
        return null;
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    return match?.[1] || null;
}
/** Captures a single frame from a <video> element as a JPEG data-URL. */
function captureVideoFrame(video) {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/jpeg', 0.6);
        }
    }
    catch (e) {
        console.warn(LOG, "captureVideoFrame failed:", e);
    }
    return null;
}
// ─── Link Resolution ────────────────────────────────────────────────────────
/**
 * Given an element, resolve the best video-page URL by:
 *   1. Walking UP to find the nearest <a> ancestor
 *   2. Checking data-href / data-url attributes (SPAs often use these)
 *   3. Searching siblings/nearby <a> elements in the same card container
 *   4. Coordinate-based fallback (element-from-point nearby)
 */
function resolveLink(el) {
    const fallback = { url: window.location.href, isDirectVideo: false };
    if (!el)
        return fallback;
    // Strategy 1: Closest <a> ancestor (the most common pattern)
    const anchor = el.closest('a');
    if (anchor?.href && !anchor.href.startsWith('javascript:')) {
        return { url: anchor.href, isDirectVideo: scoreUrl(anchor.href) >= 1000 };
    }
    // Strategy 2: data-href / data-url on the element or ancestors
    let current = el;
    for (let i = 0; i < 6 && current; i++) {
        const dataHref = current.getAttribute('data-href') || current.getAttribute('data-url') || current.getAttribute('data-video-url');
        if (dataHref) {
            try {
                const resolved = new URL(dataHref, window.location.href).href;
                return { url: resolved, isDirectVideo: scoreUrl(resolved) >= 1000 };
            }
            catch { /* ignore malformed */ }
        }
        current = current.parentElement;
    }
    // Strategy 3: Look for <a> links inside the same card/container
    const container = el.closest('article, [class*="card"], [class*="item"], [class*="thumb"], [class*="video"], li, .grid-item');
    if (container) {
        const links = Array.from(container.querySelectorAll('a[href]'))
            .filter(a => a.href && !a.href.startsWith('javascript:'));
        if (links.length > 0) {
            links.sort((a, b) => scoreUrl(b.href) - scoreUrl(a.href));
            const best = links[0];
            return { url: best.href, isDirectVideo: scoreUrl(best.href) >= 1000 };
        }
    }
    // Strategy 4: Direct video src if a <video> is present
    const video = el.closest('video') || el.querySelector('video');
    if (video) {
        const src = video.src || video.querySelector('source')?.src;
        if (src && !src.startsWith('blob:')) {
            return { url: src, isDirectVideo: true };
        }
    }
    // Strategy 5: Coordinate-based fallback (nearby elements)
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const offsets = [
        [0, -30], [0, 30], [-30, 0], [30, 0],
        [-30, -30], [30, -30], [-30, 30], [30, 30]
    ];
    const nearbyAnchors = offsets
        .map(([dx, dy]) => document.elementFromPoint(cx + dx, cy + dy)?.closest('a'))
        .filter((a) => !!a?.href && !a.href.startsWith('javascript:'));
    if (nearbyAnchors.length > 0) {
        // Deduplicate and score
        const unique = [...new Set(nearbyAnchors.map(a => a.href))];
        unique.sort((a, b) => scoreUrl(b) - scoreUrl(a));
        return { url: unique[0], isDirectVideo: scoreUrl(unique[0]) >= 1000 };
    }
    return fallback;
}
// ─── Metadata Extraction ────────────────────────────────────────────────────
/**
 * Extracts metadata (title, author, duration) from the DOM around the thumbnail.
 * Searches in a widening radius: element → card container → section → page meta.
 */
function extractMetadata(el) {
    let title = "";
    let author = "";
    let duration = 0;
    if (!el)
        return { title, author, duration };
    // Start with aria-label / title attributes (very reliable on YouTube, etc.)
    title = el.getAttribute('aria-label')
        || el.getAttribute('title')
        || el.closest('a')?.getAttribute('aria-label')
        || el.closest('a')?.getAttribute('title')
        || "";
    // For <img> elements, alt text is a great fallback
    if (!title && el.tagName === 'IMG') {
        title = el.alt || "";
    }
    // Find the enclosing "card" container
    const container = el.closest('article, [class*="card"], [class*="item"], [class*="thumb"], [class*="video"], li, .grid-item') || el.closest('a')?.parentElement || el.parentElement;
    if (container) {
        // Title from heading/title elements
        if (!title) {
            const titleEl = container.querySelector('h1, h2, h3, h4, .title, [class*="title"], [id*="title"], [class*="name"]');
            if (titleEl)
                title = titleEl.textContent?.trim().replace(/\s+/g, ' ') || "";
        }
        // Author from common patterns
        const authorEl = container.querySelector('.author, .channel, .uploader, [class*="user"], [class*="author"], [class*="channel"], [class*="uploader"], [id*="channel"]');
        if (authorEl)
            author = authorEl.textContent?.trim().replace(/\s+/g, ' ') || "";
        // Duration: look for time-badge elements commonly placed on thumbnails
        const durationEl = container.querySelector('.duration, [class*="duration"], [class*="time"], time, [class*="length"]');
        if (durationEl) {
            const parsed = parseTimeString(durationEl.textContent?.trim() || "");
            if (parsed > 0)
                duration = parsed;
        }
    }
    // Fallback: anchor text
    if (!title) {
        title = el.closest('a')?.textContent?.trim().replace(/\s+/g, ' ') || "";
    }
    // Extract duration from title (e.g., "My Video [12:34]")
    if (duration === 0) {
        const timeRegex = /(?:^|\s|\[|\()(\d{1,2}:\d{2}(?::\d{2})?)(?:\]|\)|\s|$)/;
        const timeMatch = title.match(timeRegex);
        if (timeMatch) {
            duration = parseTimeString(timeMatch[1]);
            // Scrub the timestamp from the title
            title = title.replace(timeMatch[0], ' ').trim().replace(/^[\(\)\[\]]\s*/, '');
        }
    }
    return { title, author, duration };
}
/** Converts "MM:SS" or "HH:MM:SS" to raw seconds. Returns 0 on failure. */
function parseTimeString(str) {
    const match = str.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (!match)
        return 0;
    const parts = [match[1], match[2], match[3]].filter(Boolean).map(Number);
    if (parts.length === 3)
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2)
        return parts[0] * 60 + parts[1];
    return 0;
}
// ─── Thumbnail-First Target Resolution ──────────────────────────────────────
/**
 * The core function: given the element the user is hovering over, resolve the
 * full capture target using a **thumbnail-first** approach.
 *
 *   Step 1 → Find the thumbnail (image/bg/video frame under cursor)
 *   Step 2 → Walk UP to resolve the link URL
 *   Step 3 → Extract metadata from the surrounding card
 */
function resolveTarget(el) {
    console.log(LOG, "resolveTarget: el=", el?.tagName, el?.className?.substring(0, 40));
    // Defaults
    const result = {
        url: window.location.href,
        isDirectVideo: false,
        fallbackThumbnail: null,
        localMeta: { title: "", author: "", duration: 0 }
    };
    if (!el)
        return result;
<<<<<<< Updated upstream
    // Step 1: Find the thumbnail
    const thumb = findThumbnail(el);
    result.fallbackThumbnail = thumb.src;
    console.log(LOG, "resolveTarget: thumbnail found=", !!thumb.src);
    // Step 2: Resolve the link.
    // Use the thumbnail element if we found one (it's deeper in the right DOM
    // subtree), otherwise fall back to the hovered element itself.
    const linkSource = thumb.element || el;
    const link = resolveLink(linkSource);
    result.url = link.url;
    result.isDirectVideo = link.isDirectVideo;
    console.log(LOG, "resolveTarget: url=", result.url, "isDirectVideo=", result.isDirectVideo);
    // Step 3: Extract metadata from the surrounding area.
    // Start from the hovered element for the widest context.
    result.localMeta = extractMetadata(el);
    console.log(LOG, "resolveTarget: meta=", result.localMeta);
=======
    }
    const videoEntry = videoNodes.find(v => element.contains(v.element) || v.element.contains(element) || v.element === element);
    const imgEntry = !videoEntry ? imgNodes.find(i => element.contains(i.element) || i.element.contains(element) || i.element === element) : undefined;
    if (videoEntry) {
        console.log(`${LOG_PREFIX} getBestTarget: found <video> in registry. Attempting frame capture.`);
        result.fallbackThumbnail = captureVideoFrame(videoEntry.element);
    }
    else if (imgEntry) {
        result.fallbackThumbnail = imgEntry.src;
        console.log(`${LOG_PREFIX} getBestTarget: found <img> in registry. fallbackThumbnail src length=${result.fallbackThumbnail?.length ?? 0}`);
    }
    else {
        console.log(`${LOG_PREFIX} getBestTarget: no <video> or <img> found in registry for element. fallbackThumbnail will be null.`);
    }
    const video = videoEntry?.element ?? null;
    const anchor = element.closest('a');
    if (anchor && anchor.href) {
        result.url = anchor.href;
        const score = scoreUrl(anchor.href);
        if (score >= 1000)
            result.isDirectVideo = true;
        console.log(`${LOG_PREFIX} getBestTarget: resolved URL from anchor href:`, result.url, "| score:", score, "| isDirectVideo:", result.isDirectVideo);
        return result;
    }
    if (video) {
        const src = videoEntry?.src || video.src || video.querySelector('source')?.src;
        if (src && !src.startsWith('blob:')) {
            result.url = src;
            result.isDirectVideo = true;
            console.log(`${LOG_PREFIX} getBestTarget: resolved URL from video.src:`, result.url);
            return result;
        }
        else {
            console.warn(`${LOG_PREFIX} getBestTarget: video.src is a blob or empty:`, video.src);
        }
    }
    // Coordinate Fallback with scoreUrl prioritization
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nearbyLinks = [
        document.elementFromPoint(x, y - 30)?.closest('a'),
        document.elementFromPoint(x, y + 30)?.closest('a'),
        document.elementFromPoint(x - 30, y)?.closest('a'),
        document.elementFromPoint(x + 30, y)?.closest('a')
    ].filter((link) => link !== undefined && link !== null && !!link.href);
    if (nearbyLinks.length > 0) {
        nearbyLinks.sort((a, b) => scoreUrl(b.href) - scoreUrl(a.href));
        result.url = nearbyLinks[0].href;
        if (scoreUrl(result.url) >= 1000)
            result.isDirectVideo = true;
        console.log(`${LOG_PREFIX} getBestTarget: resolved URL from coordinate fallback:`, result.url, "| score:", scoreUrl(result.url));
    }
    else {
        console.warn(`${LOG_PREFIX} getBestTarget: no anchor found via coordinates. Using window.location.href:`, result.url);
    }
>>>>>>> Stashed changes
    return result;
}
// ═══════════════════════════════════════════════════════════════════════════
//  CAPTURE FLOW
// ═══════════════════════════════════════════════════════════════════════════
function startCaptureFlow() {
    const target = resolveTarget(lastHoveredElement);
    console.log(LOG, "startCaptureFlow:", target.url, "thumb?", !!target.fallbackThumbnail);
    const notificationId = `capture-${Date.now()}`;
    const previewTitle = target.localMeta.title?.substring(0, 20) || "item";
    showVaultNotification("processing", `Saving: ${previewTitle}...`, notificationId);
    attemptExtraction(target, notificationId);
}
function attemptExtraction(target, notificationId) {
    const isLocalCapture = target.url === window.location.href || target.isDirectVideo;
    let safeHostname = window.location.hostname;
    try {
        safeHostname = new URL(target.url).hostname;
    }
    catch { /* keep default */ }
    const metaDataPayload = isLocalCapture ? {
        title: document.title || target.localMeta.title || target.url.split('/').pop() || "Captured Media",
        author: document.querySelector('meta[name="author"]')?.getAttribute("content") || target.localMeta.author || window.location.hostname,
        duration: target.localMeta.duration || 0,
        tags: Array.from(document.querySelectorAll('meta[property="video:tag"]')).map((m) => m.getAttribute("content") || ""),
        date: new Date().toISOString()
    } : {
        title: target.localMeta.title || target.url.split('/').pop() || "Captured Link",
        author: target.localMeta.author || safeHostname,
        duration: target.localMeta.duration || 0,
        tags: [],
        date: new Date().toISOString()
    };
    const payload = {
        url: target.url,
        thumbnail: target.fallbackThumbnail || "",
        ...metaDataPayload
    };
    console.log(LOG, "attemptExtraction: sending process_capture. title=", payload.title, "thumb len=", payload.thumbnail.length);
    browser.runtime.sendMessage({
        action: "process_capture",
        data: payload
    }).then((res) => {
        const response = res;
        if (!response) {
            showVaultNotification('error', 'Extension background offline', notificationId);
            return;
        }
        if (response.success) {
            showVaultNotification('success', 'Added to Vault', notificationId);
            highlightVaultItems();
        }
        else {
            showVaultNotification('error', response.message || 'Failed to capture', notificationId);
        }
    }).catch((e) => {
        console.error(LOG, "Message passing error:", e);
        showVaultNotification('error', 'Connection to Vault lost', notificationId);
    });
}
// ═══════════════════════════════════════════════════════════════════════════
//  HEART INDICATOR (marks saved items on the page)
// ═══════════════════════════════════════════════════════════════════════════
function addHeartIndicator(el) {
    if (!el || el.querySelector(".vault-heart-indicator"))
        return;
    const style = window.getComputedStyle(el);
    if (style.position === "static")
        el.style.position = "relative";
    const heart = document.createElement("div");
    heart.className = "vault-heart-indicator";
    heart.innerHTML = `
        <style>
            .vault-heart-indicator svg {
                width: 14px; height: 14px;
                background: #22c55e; padding: 4px; border-radius: 4px;
                fill: white; stroke: white;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            }
            .vault-heart-indicator:hover svg { border: 2px dashed white; padding: 2px; }
        </style>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    Object.assign(heart.style, {
        position: "absolute", top: "4px", left: "4px",
        zIndex: "2147483647", pointerEvents: "auto",
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    });
    el.appendChild(heart);
}
async function highlightVaultItems() {
    try {
        const storage = await browser.storage.local.get(STORAGE_KEYS.SAVED_VIDEOS);
        const savedVideos = (storage[STORAGE_KEYS.SAVED_VIDEOS] || []);
        if (savedVideos.length === 0)
            return;
        const savedUrls = new Set(savedVideos.map((v) => v.url));
        document.querySelectorAll("a").forEach(link => {
            if (savedUrls.has(link.href))
                addHeartIndicator(link);
        });
    }
    catch (e) {
        console.error(LOG, "highlightVaultItems error:", e);
    }
}
// ═══════════════════════════════════════════════════════════════════════════
//  NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════
const activeNotifications = new Map();
const MAX_CONCURRENT_NOTIFICATIONS = 5;
function showVaultNotification(type, message, id) {
    const portalId = id || `vault-notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let el = activeNotifications.get(portalId);
    const isUpdate = !!el;
    if (!el) {
        if (activeNotifications.size >= MAX_CONCURRENT_NOTIFICATIONS) {
            const result = activeNotifications.keys().next();
            const oldestKey = result.value;
            if (oldestKey !== undefined) {
                activeNotifications.get(oldestKey)?.remove();
                activeNotifications.delete(oldestKey);
            }
        }
        el = document.createElement("div");
        el.id = portalId;
        activeNotifications.set(portalId, el);
        document.body.appendChild(el);
    }
    const iconMap = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;color:#10b981;margin-right:8px"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        removed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;color:#f97316;margin-right:8px"><path d="M19 12H5"></path></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;color:#ef4444;margin-right:8px"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
        processing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;color:#3b82f6;margin-right:8px;animation:vault-spin 1s linear infinite"><style>@keyframes vault-spin{100%{transform:rotate(360deg)}}</style><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`
    };
    el.innerHTML = `<div style="display:flex;align-items:center">${iconMap[type] || iconMap.error}<span style="flex:1">${message.toUpperCase()}</span></div>`;
    const themeMap = {
        success: { border: "#059669" },
        removed: { border: "#ea580c" },
        error: { border: "#dc2626" },
        processing: { border: "#2563eb" }
    };
    const theme = themeMap[type] || themeMap.error;
    const entries = Array.from(activeNotifications.entries());
    const index = entries.findIndex(([k]) => k === portalId);
    const renderIndex = index === -1 ? activeNotifications.size - 1 : index;
    const bottomOffset = 24 + (renderIndex * NOTIFICATION_CONFIG.STACK_OFFSET);
    Object.assign(el.style, {
        position: "fixed", bottom: `${bottomOffset}px`, right: "24px",
        padding: "14px 24px", height: "50px", boxSizing: "border-box",
        borderRadius: "4px", borderLeft: `4px solid ${theme.border}`,
        backgroundColor: "rgba(11,15,25,0.98)", color: "white",
        fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)",
        zIndex: NOTIFICATION_CONFIG.Z_INDEX.toString(),
        transition: "all 0.5s cubic-bezier(0.19,1,0.22,1)",
        opacity: isUpdate ? "1" : "0",
        transform: isUpdate ? "translateX(0)" : "translateX(100%)",
        pointerEvents: "none", backdropFilter: "blur(12px)"
    });
    if (!isUpdate) {
        requestAnimationFrame(() => {
            if (el) {
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
            }
        });
    }
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
                        updateNotificationOffsets();
                    }, 500);
                }
            }
        }, NOTIFICATION_CONFIG.DURATION);
    }
    // Mark saved item with heart
    const indicatorTarget = portalId?.startsWith('capture-') ? null : (lastHoveredElement?.closest("a") || lastHoveredElement);
    if (type === 'success' && indicatorTarget)
        addHeartIndicator(indicatorTarget);
    if (type === 'removed' && indicatorTarget) {
        indicatorTarget.querySelector(".vault-heart-indicator")?.remove();
    }
}
function updateNotificationOffsets() {
    Array.from(activeNotifications.entries()).forEach(([_id, el], index) => {
        el.style.bottom = `${24 + (index * NOTIFICATION_CONFIG.STACK_OFFSET)}px`;
    });
}
// ═══════════════════════════════════════════════════════════════════════════
//  MESSAGE HANDLER (commands from background script)
// ═══════════════════════════════════════════════════════════════════════════
browser.runtime.onMessage.addListener((request) => {
    if (request.action === "ping")
        return Promise.resolve(true);
    if (request.action === "extract_video") {
        const target = resolveTarget(lastHoveredElement);
        return Promise.resolve(attemptExtraction(target));
    }
    if (request.type === "capture-video" || request.action === "capture-video") {
        startCaptureFlow();
        return Promise.resolve(true);
    }
    return undefined;
});
<<<<<<< Updated upstream
// ═══════════════════════════════════════════════════════════════════════════
//  MUTATION OBSERVER (dynamic pages / SPAs)
// ═══════════════════════════════════════════════════════════════════════════
const observer = new MutationObserver(() => {
    if (mutationTimeout)
        clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => highlightVaultItems(), 1200);
=======
const observer = new MutationObserver((mutations) => {
    if (mutationTimeout)
        clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
        console.log(`${LOG_PREFIX} MutationObserver: DOM changed. Rescanning for saved items...`);
        highlightVaultItems();
    }, 1200);
    for (const mutation of mutations) {
        // `MutationRecord.addedNodes` is a `NodeList` which isn't iterable unless `dom.iterable` is in tsconfig `lib`.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType !== Node.ELEMENT_NODE)
                continue;
            const el = node;
            if (el.tagName === 'VIDEO') {
                addVideoNode(el);
            }
            else if (el.tagName === 'IMG') {
                addImgNode(el);
            }
            el.querySelectorAll('video').forEach(addVideoNode);
            el.querySelectorAll('img').forEach(addImgNode);
        }
    }
>>>>>>> Stashed changes
});
function init() {
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        highlightVaultItems();
    }
}
if (document.body) {
<<<<<<< Updated upstream
    init();
}
else {
    window.addEventListener("DOMContentLoaded", init);
=======
    observer.observe(document.body, { childList: true, subtree: true });
    console.log(`${LOG_PREFIX} MutationObserver attached. Running initial highlightVaultItems.`);
    gatherMediaNodes();
    highlightVaultItems();
}
else {
    window.addEventListener("DOMContentLoaded", () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            console.log(`${LOG_PREFIX} DOMContentLoaded: MutationObserver attached. Running initial highlightVaultItems.`);
            gatherMediaNodes();
            highlightVaultItems();
        }
    });
>>>>>>> Stashed changes
}
