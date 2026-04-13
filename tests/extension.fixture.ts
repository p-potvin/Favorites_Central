import { test as base, expect, type BrowserContext } from '@playwright/test';
import path from 'path';

/**
 * Extension test fixture that loads the Chrome extension automatically.
 */
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({ browserName }, use) => {
    const pathToExtension = path.resolve('./dist');
    
    let context: BrowserContext;
    if (browserName === 'firefox') {
      context = await (base as any).firefox.launchPersistentContext('', {
        headless: true,
        args: [
          `--load-extension=${pathToExtension}`,
        ],
        firefoxUserPrefs: {
          'extensions.enabledScopes': 1,
          'extensions.autoDisableScopes': 0,
          'xpinstall.signatures.required': false,
          'devtools.debugger.remote-enabled': true,
          'devtools.chrome.enabled': true,
        },
      });
    } else {
      context = await (base as any).chromium.launchPersistentContext('', {
        headless: false,
        args: [
          `--disable-extensions-except=${pathToExtension}`,
          `--load-extension=${pathToExtension}`,
        ],
      });
    }
    
    await use(context);
    await context.close();
  },
  extensionId: async ({ context, browserName }, use) => {
    if (browserName === 'chromium') {
      let background: any = context.serviceWorkers()[0];
      if (!background) {
        background = await context.waitForEvent('serviceworker', { timeout: 15000 }).catch(() => undefined);
      }
      
      if (!background) {
        // Fallback: search for extension page in pages
        const pages = context.pages();
        const extPage = pages.find(p => p.url().startsWith('chrome-extension://'));
        if (extPage) {
           const extensionId = extPage.url().split('/')[2];
           await use(extensionId);
           return;
        }
        
        // Final fallback: Try to wait for any background page or service worker
        const backgroundPage = await context.waitForEvent('page', {
          predicate: p => p.url().startsWith('chrome-extension://'),
          timeout: 10000
        }).catch(() => null);
        
        if (backgroundPage) {
          const extensionId = backgroundPage.url().split('/')[2];
          await use(extensionId);
          return;
        }
        
        throw new Error('Could not find extension ID via service worker or background page');
      }
      
      const extensionId = background.url().split('/')[2];
      await use(extensionId);
    } else {
      // In Firefox, Playwright doesn't easily return the internal UUID in headless mode
      // But for our tests, the manifest ID "vault-central@p-potvin" can sometimes work
      // depending on how the URL is resolved.
      // Let's use the static ID and allow the test to fail if it can't find the page.
      await use('vault-central@p-potvin');
    }
  },
});

export { expect };
