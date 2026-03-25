import browser from 'webextension-polyfill';
/**
 * [VaultAuth] Storage Vault Utility
 * ---------------------------------
 * Safely accesses the chrome.storage.local.
 */
export async function getPinSettings() {
    const data = await browser.storage.local.get("pinSettings");
    const defaults = {
        enabled: false,
        length: 4,
        lockTimeout: 3600000, // 1 hour
    };
    return { ...defaults, ...data.pinSettings };
}
export async function savePinSettings(settings) {
    await browser.storage.local.set({ pinSettings: settings });
}
export async function isVaultLocked() {
    const settings = await getPinSettings();
    if (!settings.enabled)
        return false;
    if (!settings.lastUnlocked)
        return true;
    // "Never" lock
    if (settings.lockTimeout === -1)
        return false;
    const elapsed = Date.now() - settings.lastUnlocked;
    return elapsed > settings.lockTimeout;
}
export async function getSavedVideos() {
    const locked = await isVaultLocked();
    if (locked) {
        console.warn("[VaultAuth] Attempted access to locked database.");
        return [];
    }
    try {
        const rawData = await browser.storage.local.get("savedVideos");
        const videos = rawData.savedVideos || [];
        if (!Array.isArray(videos))
            return [];
        // Manual validation to avoid Zod 'unsafe-eval' issues in Firefox
        const validVideos = videos
            .filter((v) => {
            const item = v;
            return item && typeof item.url === 'string' && item.url.trim().length > 0;
        })
            .map((v) => {
            const item = v;
            return {
                url: String(item.url),
                rawVideoSrc: item.rawVideoSrc || null,
                title: String(item.title || 'Untitled'),
                thumbnail: item.thumbnail || undefined,
                timestamp: Number(item.timestamp || Date.now()),
                type: (item.type === 'video' || item.type === 'image') ? item.type : 'link',
                domain: String(item.domain || 'Unknown'),
                duration: item.duration || null,
                views: item.views || null,
                uploaded: item.uploaded || null,
                originalIndex: item.originalIndex,
                author: item.author || null,
                likes: item.likes || null,
                date: item.date || null,
                tags: Array.isArray(item.tags) ? item.tags : []
            };
        });
        return validVideos;
    }
    catch (error) {
        console.error("[VaultAuth] Storage access failed:", error);
        return [];
    }
}
/**
 * [VaultAuth] Saves the videos to local storage.
 */
export async function saveVideos(videos) {
    try {
        await browser.storage.local.set({ savedVideos: videos });
    }
    catch (error) {
        console.error("[VaultAuth] Failed to save videos:", error);
        throw new Error("Persistence error: Industrial-Cyber integrity compromised.");
    }
}
