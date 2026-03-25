import browser from 'webextension-polyfill';
import { StorageSchema, StorageData, VideoData, PinSettings } from '../types/schemas';

/**
 * [VaultAuth] Storage Vault Utility
 * ---------------------------------
 * Safely accesses the chrome.storage.local.
 */

export async function getPinSettings(): Promise<PinSettings> {
  const data: { pinSettings?: PinSettings } = await browser.storage.local.get("pinSettings");
  const defaults: PinSettings = {
    enabled: false,
    length: 4,
    lockTimeout: 3600000, // 1 hour
  };
  return { ...defaults, ...data.pinSettings };
}

export async function savePinSettings(settings: PinSettings): Promise<void> {
  await browser.storage.local.set({ pinSettings: settings });
}

export async function isVaultLocked(): Promise<boolean> {
  const settings = await getPinSettings();
  if (!settings.enabled) return false;
  
  if (!settings.lastUnlocked) return true;
  
  // "Never" lock
  if (settings.lockTimeout === -1) return false;
  
  const elapsed = Date.now() - settings.lastUnlocked;
  return elapsed > settings.lockTimeout;
}

export async function getSavedVideos(): Promise<VideoData[]> {
  const locked = await isVaultLocked();
  if (locked) {
    console.warn("[VaultAuth] Attempted access to locked database.");
    return [];
  }

  try {
    const rawData: { savedVideos?: VideoData[] } = await browser.storage.local.get("savedVideos");
    const videos = rawData.savedVideos || [];
    
    if (!Array.isArray(videos)) return [];
    
    // Manual validation to avoid Zod 'unsafe-eval' issues in Firefox
    const validVideos = videos
      .filter((v: unknown) => {
        const item = v as Partial<VideoData>;
        return item && typeof item.url === 'string' && item.url.trim().length > 0;
      })
      .map((v: unknown) => {
        const item = v as Partial<VideoData>;
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
        } as VideoData;
      });
    return validVideos;
  } catch (error) {
    console.error("[VaultAuth] Storage access failed:", error);
    return [];
  }
}

/**
 * [VaultAuth] Saves the videos to local storage.
 */
export async function saveVideos(videos: VideoData[]): Promise<void> {
  try {
    await browser.storage.local.set({ savedVideos: videos });
  } catch (error) {
    console.error("[VaultAuth] Failed to save videos:", error);
    throw new Error("Persistence error: Industrial-Cyber integrity compromised.");
  }
}
