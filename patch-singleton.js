const fs = require('fs');
let code = fs.readFileSync('background/scripts/background.ts', 'utf8');

const oldCode = \sync function openDashboard() {
    const url = browser.runtime.getURL('dashboard-v2.html');
    const tabs = await browser.tabs.query({ url });

    if (tabs.length > 0) {
        // If already open, focus the first one
        await browser.tabs.update(tabs[0].id!, { active: true });
        // Also focus the window just in case
        if (tabs[0].windowId) {
            await browser.windows.update(tabs[0].windowId, { focused: true });
        }
    } else {
        // Otherwise create new
        await browser.tabs.create({ url });
    }
}\;

const newCode = \sync function openDashboard() {
    const url = browser.runtime.getURL('dashboard-v2.html');
    const tabs = await browser.tabs.query({});
    const dashboardTab = tabs.find(t => t.url && t.url.startsWith(url));

    if (dashboardTab && dashboardTab.id) {
        // If already open, focus it
        await browser.tabs.update(dashboardTab.id, { active: true });
        // Also focus the window just in case
        if (dashboardTab.windowId) {
            await browser.windows.update(dashboardTab.windowId, { focused: true });
        }
    } else {
        // Otherwise create new
        await browser.tabs.create({ url });
    }
}\;

if (code.includes(oldCode)) {
    fs.writeFileSync('background/scripts/background.ts', code.replace(oldCode, newCode));
    console.log('Successfully patched background.ts');
} else {
    console.log('Could not find exact block in background.ts. Trying regex patch.');
    code = code.replace(/async function openDashboard\(\) \{[\s\S]*?\}\n/, newCode + '\n');
    fs.writeFileSync('background/scripts/background.ts', code);
    console.log('Patched with Regex fallback.');
}
