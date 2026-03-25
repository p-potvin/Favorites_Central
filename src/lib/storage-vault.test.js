import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSavedVideos, saveVideos } from './storage-vault';
describe('Storage Vault', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.chrome.storage.local.get.mockImplementation((_key) => {
            // browser.storage.local.get returns a promise under polyfill
            return Promise.resolve({ savedVideos: [{ url: 'http://existing.com', title: 'Existing' }] });
        });
        global.chrome.storage.local.set.mockImplementation((_data) => {
            return Promise.resolve();
        });
    });
    it('gets saved videos', async () => {
        const videos = await getSavedVideos();
        expect(videos.length).toBe(1);
        expect(videos[0].title).toBe('Existing');
    });
    it('saves new videos', async () => {
        const newVideos = [{ url: 'http://new.com', title: 'New Video' }];
        await saveVideos(newVideos);
        // Check that chrome.storage.local.set was called with data
        expect(global.chrome.storage.local.set).toHaveBeenCalled();
        const setCallArgs = global.chrome.storage.local.set.mock.calls[0][0];
        const saved = setCallArgs['savedVideos'];
        expect(saved.length).toBe(1);
        expect(saved[0].title).toBe('New Video');
    });
});
