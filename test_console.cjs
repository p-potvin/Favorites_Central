
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/dist/dashboard-v2.html');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
