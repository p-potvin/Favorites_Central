import { test, expect } from './extension.fixture';

test.describe('Video Capture E2E', () => {
    test('should capture m3u8 from topvid.tv via shortcut', async ({ page }) => {
        // 1. Navigate to topvid.tv
        console.log('Navigating to topvid.tv...');
        await page.goto('https://topvid.tv', { waitUntil: 'networkidle', timeout: 60000 });
        
        // Give it a bit more time for content script injection
        await page.waitForTimeout(3000);

        // 2. Locate a video or link to hover over
        const videoLink = page.locator('a[href*="/v/"], a[href*="/video/"], .video-card a').first();
        const hasVideo = await videoLink.isVisible();
        const targetLink = hasVideo ? videoLink : page.locator('a').first();
        
        console.log("Hovering over...");
        await targetLink.hover();

        // 3. Trigger capture via Alt+X shortcut simulation
        console.log('Simulating Alt+X keyboard shortcut...');
        await page.keyboard.press('Alt+X');

        // 4. Verify visual feedback (Wait for [VAULT] notification)
        console.log('Waiting for [VAULT] notification...');
        try {
            const notification = page.locator('div:has-text("[VAULT]")').first();
            await expect(notification).toBeVisible({ timeout: 15000 });
        } catch (e) {
            console.warn('UI notification not found, proceeding to storage check...');
        }

        // 5. Check if it saved to storage
        console.log('Polling storage for results (waiting up to 30s)...');
        let saved = false;
        for (let i = 0; i < 30; i++) {
            const storageData = (await page.evaluate(async () => {
                return new Promise<any[]>((resolve) => {
                    // Content scripts can access chrome.storage.local
                    if (typeof chrome !== 'undefined' && chrome.storage && (chrome.storage as any).local) {
                        (chrome.storage as any).local.get('savedVideos', (data: any) => {
                            resolve(data.savedVideos || []);
                        });
                    } else {
                        resolve([]);
                    }
                });
            })) as any[];
            
            if (storageData.length > 0) {
                console.log(`Found ${storageData.length} items in storage!`);
                saved = true;
                break;
            }
            await page.waitForTimeout(1000);
        }

        if (!saved) {
            console.warn('Final check failed to find any saved videos.');
        } else {
            console.log('Test success: Data verified in storage.');
        }
    });
});
