
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const server = spawn('npx.cmd', ['vite', 'preview', '--port', '3215']);
setTimeout(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    await page.goto('http://localhost:3215/dashboard-v2.html');
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
    server.kill();
    process.exit(0);
}, 2000);

