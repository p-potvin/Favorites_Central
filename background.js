// Listen for the keyboard shortcut
browser.commands.onCommand.addListener(async (command) => {
  if (command === "capture-video") {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tab) return;
      
      // Ask the content script for the data under the mouse
      const data = await browser.tabs.sendMessage(tab.id, { action: "get_video_data" });

      if (data && data.url) {
        
        // If content.js couldn't get a thumbnail, fallback to captureVisibleTab
        if (!data.thumbnail || data.thumbnail === "") {
            try {
                data.thumbnail = await browser.tabs.captureVisibleTab(tab.windowId, { format: "jpeg", quality: 80 });
            } catch(e) {
                console.error("Screenshot capture failed:", e);
            }
        }

        const storage = await browser.storage.local.get({ savedVideos: [] });
        const isDuplicate = storage.savedVideos.some(v => v.url === data.url);

        if (isDuplicate) {
          storage.savedVideos = storage.savedVideos.filter(v => v.url !== data.url);
          await browser.storage.local.set({ savedVideos: storage.savedVideos });
          await browser.tabs.sendMessage(tab.id, { action: "show_notification", type: "removed", message: "Removed from favorites!" });
        } else {
          storage.savedVideos.push(data);
          await browser.storage.local.set({ savedVideos: storage.savedVideos });
          await browser.tabs.sendMessage(tab.id, { action: "show_notification", type: "success", message: "Saved successfully!" });
        }
      } else {
        await browser.tabs.sendMessage(tab.id, { action: "show_notification", type: "error", message: "Could not capture link data." });
      }
    } catch (e) {
      console.error(e);
    }
  }
});

// Open the dashboard when clicking the extension icon
browser.action.onClicked.addListener(() => {
  browser.tabs.create({ url: "dashboard.html" });
});

// Handle cross-origin fetch requests from the dashboard
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetch_html") {
    fetch(request.url)
      .then(res => res.text())
      .then(html => sendResponse({ html: html }))
      .catch(err => sendResponse({ error: err.toString() }));
    return true; // Keep the message channel open for async response
  }
});

