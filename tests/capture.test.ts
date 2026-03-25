import { test, expect } from './extension.fixture';

test.describe('Video Capture E2E', () => {
    test('should capture m3u8 from topvid.tv via shortcut', async ({ page }) => {
        await page.goto('https://topvid.tv', { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
        const link = page.locator('a').first();
        await link.hover();
        await page.evaluate(() => {
            window.postMessage({ type: 'FAVORITES_CAPTURE_TRIGGER', command: 'capture-video' }, '*');
        });
        let saved = false;
        for (let i = 0; i < 20; i++) {
            const data = await page.evaluate(async () => {
                return new Promise((resolve) => {
                    if (typeof chrome !== 'undefined' && chrome.storage) {
                        chrome.storage.local.get('savedVideos', (d) => resolve(d.savedVideos || []));
                    } else resolve([]);
                });
            }) as any[];
            if (data.length > 0) { saved = true; break; }
            await page.waitForTimeout(1000);
        }
        expect(saved).toBe(true);
    });
});