const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://topvid.tv', { waitUntil: 'domcontentloaded' });
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href && href.length > 20);
  });
  console.log(links.slice(0, 10));
  await browser.close();
})();
