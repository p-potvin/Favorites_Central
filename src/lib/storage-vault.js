import browser from 'webextension-polyfill';
/**
 * [VaultAuth] Storage Vault Utility
 * ---------------------------------
 * Safely accesses the chrome.storage.local.
 */
export async function getSavedVideos() {
    try {
        const rawData = await browser.storage.local.get("savedVideos");
        const videos = rawData.savedVideos || [];
        if (!Array.isArray(videos))
            return [];
        // Manual validation to avoid Zod 'unsafe-eval' issues in Firefox
        const validVideos = videos
            .filter((v) => v && typeof v.url === 'string' && v.url.trim().length > 0)
            .map((v) => ({
            url: String(v.url),
            rawVideoSrc: v.rawVideoSrc || null,
            title: String(v.title || 'Untitled'),
            thumbnail: v.thumbnail || undefined,
            timestamp: Number(v.timestamp || Date.now()),
            type: (v.type === 'video' || v.type === 'image') ? v.type : 'link',
            domain: String(v.domain || 'Unknown'),
            duration: v.duration || null,
            views: v.views || null,
            uploaded: v.uploaded || null,
            originalIndex: v.originalIndex,
            author: v.author || null,
            likes: v.likes || null,
            date: v.date || null,
            tags: Array.isArray(v.tags) ? v.tags : []
        }));
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
