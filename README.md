# Favorites Central

A simple and lightweight browser extension designed to instantly save your favorite videos and links while browsing. By utilizing a quick keyboard shortcut, you can effortlessly capture the video or link directly under your mouse cursor and store it in a neatly organized dashboard.

## Features

- **Quick Capture:** Use a designated keyboard shortcut (`Ctrl+Shift+S`) to instantly save details about the video or link currently under your mouse.
- **Automatic Thumbnails:** Attempts to capture the current frame of the video to display as a thumbnail in your dashboard.
- **Easy Access Dashboard:** Click the extension icon in your browser toolbar to open a dedicated dashboard where all your saved items are listed.
- **Manage Saved Items:** Easily review, open in a new tab, or delete any saved videos directly from your dashboard.

## How It Works

- When you press `Ctrl+Shift+S`, the script evaluates the element directly under your cursor.
- If it detects a `<video>` tag or a link (`<a>`), it extracts the URL and attempts to capture a snapshot frame.
- All extracted data is stored locally in your browser using the extensions storage API.
- Opening the extension loads a dashboard to browse all your favorite videos and links.

## Installation Instructions (Local/Developer Mode)

> **Note**: Because this extension relies on the `browser.*` Promise-based namespace and specifies `"scripts"` in a Manifest V3 background configuration, it is natively structured for **Mozilla Firefox**. 
> To test in Google Chrome or Edge without polyfills natively, you may need to update `"background": {"scripts": ...}` to `"background": {"service_worker": "background.js"}` in `manifest.json`, and substitute `browser.` calls with `chrome.`.

### Installing on Mozilla Firefox (Recommended)

1. Open Firefox and type `about:debugging` in the address bar, then press **Enter**.
2. Click on **This Firefox** in the left sidebar.
3. Under the **Temporary Extensions** section, click the **Load Temporary Add-on...** button.
4. Navigate to the folder where you saved this project (`favorites_central`).
5. Select any file in the directory (such as `manifest.json`) and click **Open**.
6. The extension is now successfully installed. Pin its icon in your toolbar to easily access the dashboard later!

### Installing on Google Chrome / Microsoft Edge

1. Open your browser and navigate to the extensions page:
   - **Chrome:** Type `chrome://extensions/` 
   - **Edge:** Type `edge://extensions/`
2. Turn on **Developer mode** using the toggle switch (usually found in the top right or bottom left corner depending on the browser).
3. Click the **Load unpacked** button.
4. Select the `favorites_central` directory containing the `manifest.json` file.
5. The extension will be loaded locally and appear alongside your other extensions.

## Usage Guide

1. **Capture:** Visit any webpage, hover your mouse cursor over a video or link, and press **Ctrl+Shift+S**.
2. **View:** Click the "Favorites Central" icon in your browser extension bar to open your dashboard.
3. **Manage:** In the dashboard, you can browse via thumbnails, click **Open Link** to revisit an item, or press **Delete** to discard it from memory.
