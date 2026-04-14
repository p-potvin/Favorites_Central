import browser from 'webextension-polyfill';
import { STORAGE_KEYS, NOTIFICATION_CONFIG } from '../lib/constants';
/**
 * [VaultAuth] Content Script (Modernized)
 * --------------------------------------
 * Handles DOM-based video detection, visual status indicators (Hearts),
 * and user notifications with a security-first approach.
 */
const LOG_PREFIX = "[VaultAuth:content]";
let lastHoveredElement = null;
let mutationTimeout = null;
document.addEventListener("mousemove", (e) => {
    lastHoveredElement = document.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });
document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "x" || e.key === "X" || e.code === "KeyX")) {
        console.log(`${LOG_PREFIX} Alt+X shortcut detected. lastHoveredElement:`, lastHoveredElement?.tagName, lastHoveredElement?.className?.substring(0, 40));
        e.preventDefault();
        e.stopPropagation();
        startCaptureFlow();
    }
}, { capture: true });
function addHeartIndicator(el) {
    if (!el || el.querySelector(".vault-heart-indicator")) {
        console.log(`${LOG_PREFIX} addHeartIndicator: skipped (already present or no element).`);
        return;
    }
    console.log(`${LOG_PREFIX} addHeartIndicator: adding to element`, el.tagName, el.className?.substring(0, 40));
    const style = window.getComputedStyle(el);
    if (style.position === "static") {
        el.style.position = "relative";
    }
    const heart = document.createElement("div");
    heart.className = "vault-heart-indicator";
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
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
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
    console.log(`${LOG_PREFIX} highlightVaultItems: scanning page for saved URLs...`);
    try {
        const storage = await browser.storage.local.get(STORAGE_KEYS.SAVED_VIDEOS);
        const savedVideos = (storage[STORAGE_KEYS.SAVED_VIDEOS] || []);
        console.log(`${LOG_PREFIX} highlightVaultItems: found ${savedVideos.length} saved items in vault.`);
        if (savedVideos.length === 0)
            return;
        const savedUrls = new Set(savedVideos.map((v) => v.url));
        const links = document.querySelectorAll("a");
        let marked = 0;
        links.forEach(link => {
            if (savedUrls.has(link.href)) {
                addHeartIndicator(link);
                marked++;
            }
        });
        console.log(`${LOG_PREFIX} highlightVaultItems: marked ${marked} links out of ${links.length} found on page.`);
    }
    catch (e) {
        console.error(`${LOG_PREFIX} Highlight failure:`, e);
    }
}
/**
 * Industrial Notification System (Modernized)
 */
const activeNotifications = new Map();
const MAX_CONCURRENT_NOTIFICATIONS = 5;
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
function captureVideoFrame(video) {
    try {
        console.log(`${LOG_PREFIX} captureVideoFrame: attempting capture. videoWidth=${video.videoWidth}, videoHeight=${video.videoHeight}, readyState=${video.readyState}`);
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            console.log(`${LOG_PREFIX} captureVideoFrame: success. dataUrl length=${dataUrl.length}`);
            return dataUrl;
        }
        console.warn(`${LOG_PREFIX} captureVideoFrame: canvas.getContext('2d') returned null.`);
    }
    catch (e) {
        console.warn(`${LOG_PREFIX} Failed to capture video frame:`, e);
    }
    return null;
}
function scoreUrl(url) {
    if (!url || url.startsWith('javascript:'))
        return -1;
    const lowerUrl = url.toLowerCase();
    let score = 0;
    // 1. Direct Video Files (Highest Priority)
    if (/\.(mp4|webm|mkv|flv|mov|m3u8|ts)(\?|$)/.test(lowerUrl)) {
        score += 1000;
    }
    // 2. Known Video Platforms / Manifests
    if (/(youtube\.com\/watch|youtu\.be|vimeo\.com|tiktok\.com|twitch\.tv|pornhub|xvideos)/.test(lowerUrl)) {
        score += 500;
    }
    // 3. URLs with Media Indicators in the path
    if (/(video|player|embed|watch|clip|media|vod)/.test(lowerUrl)) {
        score += 200;
    }
    // 4. Query string parameters indicating media
    if (lowerUrl.includes('?v=') || lowerUrl.includes('?video=')) {
        score += 100;
    }
    return score;
}
function extractSurroundingMetadata(element) {
    let title = "";
    let author = "";
    let duration = 0; // Initialize duration to 0
    if (!element)
        return { title, author, duration };
    title = element.getAttribute('aria-label') || element.getAttribute('title') || element.closest('a')?.getAttribute('aria-label') || "";
    if (!title && element.tagName.toLowerCase() === 'img') {
        title = element.alt;
    }
    const container = element.closest('article, .video-card, .grid-item, li, div[class*="item"], div[class*="card"]') || document.body;
    if (!title) {
        const titleEl = container.querySelector('h1, h2, h3, h4, .title, [class*="title"], [id*="title"]');
        if (titleEl)
            title = titleEl.textContent?.trim().replace(/\s+/g, ' ') || "";
    }
    const authorEl = container.querySelector('.author, .channel, [class*="user"], [class*="author"], [id*="channel"]');
    if (authorEl)
        author = authorEl.textContent?.trim().replace(/\s+/g, ' ') || "";
    if (!title) {
        title = element.closest('a')?.textContent?.trim().replace(/\s+/g, ' ') || "";
    }
    // --- NEW DURATION EXTRACTION LOGIC ---
    // Matches patterns like 12:34, 1:05:20, [12:34], (12:34)
    const timeRegex = /(?:^|\s|\[|\()(\d{1,2}:\d{2}(?::\d{2})?)(?:\]|\)|\s|$)/;
    const timeMatch = title.match(timeRegex);
    if (timeMatch) {
        const timeStr = timeMatch[1];
        // Scrub the timestamp from the title
        title = title.replace(timeMatch[0], ' ').trim();
        // Clean up any remaining hanging brackets like "[] My Video" -> "My Video"
        title = title.replace(/^[\(\)\[\]]\s*/, '');
        // Convert MM:SS or HH:MM:SS to raw seconds
        const parts = timeStr.split(':').map(Number);
        if (parts.length === 3) {
            duration = (parts[0] * 3600) + (parts[1] * 60) + parts[2];
        }
        else if (parts.length === 2) {
            duration = (parts[0] * 60) + parts[1];
        }
    }
    return { title, author, duration };
}
function getBestTarget(element) {
    let result = {
        url: window.location.href,
        isDirectVideo: false,
        fallbackThumbnail: null,
        localMeta: extractSurroundingMetadata(element)
    };
    console.log(`${LOG_PREFIX} getBestTarget: element=`, element?.tagName, element?.className?.substring(0, 40));
    console.log(`${LOG_PREFIX} getBestTarget: localMeta=`, result.localMeta);
    if (!element) {
        console.warn(`${LOG_PREFIX} getBestTarget: no element. Falling back to window.location.href:`, result.url);
        return result;
    }
    const video = element.closest('video') || element.querySelector('video');
    if (video) {
        console.log(`${LOG_PREFIX} getBestTarget: found <video> element. Attempting frame capture.`);
        result.fallbackThumbnail = captureVideoFrame(video);
    }
    else if (element.tagName.toLowerCase() === 'img') {
        result.fallbackThumbnail = element.src;
        console.log(`${LOG_PREFIX} getBestTarget: element is <img>. fallbackThumbnail src length=${result.fallbackThumbnail?.length ?? 0}`);
    }
    else {
        const img = element.querySelector('img');
        if (img) {
            result.fallbackThumbnail = img.src;
            console.log(`${LOG_PREFIX} getBestTarget: found child <img>. fallbackThumbnail src length=${result.fallbackThumbnail?.length ?? 0}`);
        }
        else {
            console.log(`${LOG_PREFIX} getBestTarget: no <video> or <img> found under element. fallbackThumbnail will be null.`);
        }
    }
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
        const src = video.src || video.querySelector('source')?.src;
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
    return result;
}
function startCaptureFlow() {
    const target = getBestTarget(lastHoveredElement);
    console.log(`${LOG_PREFIX} startCaptureFlow: resolved target URL:`, target.url, "| isDirectVideo:", target.isDirectVideo, "| fallbackThumbnail present:", !!target.fallbackThumbnail, "(len:", target.fallbackThumbnail?.length ?? 0, ")");
    const notificationId = `capture-${Date.now()}`;
    showVaultNotification("processing", `Infiltrating: ${target.localMeta.title?.substring(0, 20)}...`, notificationId);
    attemptExtraction(target, notificationId);
}
function attemptExtraction(target, notificationId) {
    console.log(`${LOG_PREFIX} attemptExtraction: url=${target.url} | isDirectVideo=${target.isDirectVideo} | thumbnail present=${!!target.fallbackThumbnail} (len=${target.fallbackThumbnail?.length ?? 0})`);
    const isLocalCapture = target.url === window.location.href || target.isDirectVideo;
    console.log(`${LOG_PREFIX} attemptExtraction: isLocalCapture=${isLocalCapture} (target.url === window.location.href: ${target.url === window.location.href})`);
    let safeHostname = window.location.hostname;
    try {
        safeHostname = new URL(target.url).hostname;
    }
    catch (e) {
        console.warn(`${LOG_PREFIX} attemptExtraction: Invalid URL passed to extraction:`, target.url);
    }
    const metaDataPayload = isLocalCapture ? {
        title: document.title || target.localMeta.title || target.url.split('/').pop() || "Captured Media",
        author: document.querySelector('meta[name="author"]')?.getAttribute("content") || target.localMeta.author || window.location.hostname,
        duration: target.localMeta.duration || 0,
        tags: Array.from(document.querySelectorAll('meta[property="video:tag"]')).map((m) => m.getAttribute("content") || ""),
        date: new Date().toISOString()
    } : {
        title: target.localMeta.title || target.url.split('/').pop() || "Captured Link",
        author: target.localMeta.author || safeHostname,
        tags: [],
        date: new Date().toISOString()
    };
    const payload = {
        url: target.url,
        thumbnail: target.fallbackThumbnail || "",
        ...metaDataPayload
    };
    console.log(`${LOG_PREFIX} attemptExtraction: sending process_capture. title="${payload.title}" | author="${payload.author}" | thumbnail len=${payload.thumbnail.length} | tags=${payload.tags?.length ?? 0}`);
    browser.runtime.sendMessage({
        action: "process_capture",
        data: payload
    }).then((res) => {
        const response = res;
        console.log(`${LOG_PREFIX} attemptExtraction: background responded:`, response);
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
        console.error(`${LOG_PREFIX} attemptExtraction: Message passing error:`, e);
        showVaultNotification('error', 'Connection to Vault lost', notificationId);
    });
}
browser.runtime.onMessage.addListener((request, sender) => {
    console.log(`${LOG_PREFIX} onMessage: received action="${request.action || request.type}"`);
    if (request.action === "ping")
        return Promise.resolve(true);
    if (request.action === "extract_video") {
        console.log(`${LOG_PREFIX} onMessage: extract_video requested. Forcing extraction from DOM...`);
        const target = getBestTarget(lastHoveredElement);
        return Promise.resolve(attemptExtraction(target));
    }
    if (request.type === "capture-video" || request.action === "capture-video") {
        console.log(`${LOG_PREFIX} onMessage: capture-video triggered from background command.`);
        startCaptureFlow();
        return Promise.resolve(true);
    }
    return undefined;
});
const observer = new MutationObserver(() => {
    if (mutationTimeout)
        clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
        console.log(`${LOG_PREFIX} MutationObserver: DOM changed. Rescanning for saved items...`);
        highlightVaultItems();
    }, 1200);
});
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    console.log(`${LOG_PREFIX} MutationObserver attached. Running initial highlightVaultItems.`);
    highlightVaultItems();
}
else {
    window.addEventListener("DOMContentLoaded", () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            console.log(`${LOG_PREFIX} DOMContentLoaded: MutationObserver attached. Running initial highlightVaultItems.`);
            highlightVaultItems();
        }
    });
}
