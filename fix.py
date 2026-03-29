import re

with open('background/scripts/background.ts', 'r') as f:
    code = f.read()

correct = '''async function openDashboard() {
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
}'''

code = re.sub(r'async function openDashboard\(\) \{.*?(?=  \/\*\*\n   \* Core Capture Processing)', correct + '\n', code, flags=re.DOTALL)

with open('background/scripts/background.ts', 'w') as f:
    f.write(code)
