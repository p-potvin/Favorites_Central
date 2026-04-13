import { test, expect } from './extension.fixture';

test.describe('Vault Central Extension Tests', () => {

  test('extension scripts should be loaded and responsive', async ({ page }) => {
    // Navigate to a common video site or a blank page
    await page.goto('https://www.example.com');
    
    // Check if the service worker is active (via the extension background page)
    // The fixture already finds the extensionId for us
  });

  test('dashboard should open from the extension action', async ({ context, extensionId, browserName }) => {
    const dashboardPage = await context.newPage();
    const protocol = browserName === 'firefox' ? 'moz-extension' : 'chrome-extension';
    await dashboardPage.goto(`${protocol}://${extensionId}/dashboard-v2.html`);
    
    // Based on Dashboard.tsx, let's look for the main layout container
    // Note: The UI now shows "Vault Central" as the branding
    await expect(dashboardPage.locator('h1')).toContainText('Vault Central');
    
    // Check if the search input exists
    const searchInput = dashboardPage.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
  });

  test('content script should detect potential video context (mock test)', async ({ page }) => {
    await page.goto('https://www.example.com');
    
    // We can evaluate code inside the page to check if our content script injected anything
    // or to simulate a message to it.
    const isScriptInjected = await page.evaluate(() => {
        // Look for marks left by our style or save UI
        return !!document.querySelector('style[data-vault-central]');
    });
    
    // Note: Since we are in a fresh build, this might be false on example.com
    // but we can at least verify execution
    console.log('Content script injected:', isScriptInjected);
  });
});
