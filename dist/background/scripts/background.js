import { a as saveVideos, l as __toESM, n as getSavedVideos, o as require_browser_polyfill } from "../../storage-vault.js";
//#region background/scripts/background.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
/**
* [VaultAuth] Background Extraction Logic
* ---------------------------------------
* Performs a background extraction of video sources from a target URL.
* Uses a temporary hidden tab to intercept network requests and run injection logic.
* Compatible with Chrome and Firefox via webextension-polyfill.
*/
async function doTabExtraction(targetUrl) {
	let scraperTabId = void 0;
	let scraperWindowId = void 0;
	let webRequestListener = null;
	let globalTimeoutId = null;
	return new Promise(async (resolve) => {
		let isResolved = false;
		let latestM3u8 = null;
		let injectionStarted = false;
		const defaultMetadata = {
			title: "",
			thumbnail: "",
			duration: 0,
			author: "",
			views: "",
			tags: [],
			likes: "",
			date: ""
		};
		const cleanup = async (result, reason) => {
			if (isResolved) return;
			isResolved = true;
			if (globalTimeoutId) clearTimeout(globalTimeoutId);
			if (webRequestListener && import_browser_polyfill.default.webRequest) try {
				import_browser_polyfill.default.webRequest.onBeforeRequest.removeListener(webRequestListener);
			} catch (e) {}
			if (scraperWindowId !== void 0) try {
				await import_browser_polyfill.default.windows.remove(scraperWindowId);
			} catch (e) {
				console.debug("[VaultAuth] Window already closed or error:", e);
			}
			else if (scraperTabId !== void 0) try {
				await import_browser_polyfill.default.tabs.remove(scraperTabId);
			} catch (e) {
				console.debug("[VaultAuth] Tab already closed or error:", e);
			}
			resolve(result);
		};
		try {
			const scraperWindow = await import_browser_polyfill.default.windows.create({
				url: targetUrl,
				type: "popup",
				state: "minimized",
				focused: false
			});
			scraperWindowId = scraperWindow.id;
			const scraperTab = scraperWindow.tabs && scraperWindow.tabs.length > 0 ? scraperWindow.tabs[0] : null;
			if (scraperTab) scraperTabId = scraperTab.id;
			else scraperTabId = (await import_browser_polyfill.default.tabs.create({
				url: targetUrl,
				active: false
			})).id;
			globalTimeoutId = setTimeout(() => {
				cleanup(latestM3u8 ? {
					src: latestM3u8,
					metadata: defaultMetadata
				} : null, "Global isolation timeout reached (16s)");
			}, 16e3);
			if (import_browser_polyfill.default.webRequest) {
				webRequestListener = (details) => {
					if (details.tabId === scraperTabId && details.url.includes(".m3u8")) latestM3u8 = details.url;
				};
				import_browser_polyfill.default.webRequest.onBeforeRequest.addListener(webRequestListener, {
					urls: ["<all_urls>"],
					tabId: scraperTabId
				});
			}
			const tabUpdateListener = (tabId, info) => {
				if (tabId === scraperTabId && info.status === "complete") {
					import_browser_polyfill.default.tabs.onUpdated.removeListener(tabUpdateListener);
					injectScript();
				}
			};
			import_browser_polyfill.default.tabs.onUpdated.addListener(tabUpdateListener);
			const injectScript = async () => {
				if (injectionStarted || isResolved || scraperTabId === void 0) return;
				injectionStarted = true;
				try {
					const foundResult = (await import_browser_polyfill.default.scripting.executeScript({
						target: { tabId: scraperTabId },
						func: async () => {
							const delay = (ms) => new Promise((r) => setTimeout(r, ms));
							const findBestVideoAndMeta = () => {
								const metadata = {
									title: document.title,
									thumbnail: "",
									duration: 0,
									author: "",
									views: "",
									tags: [],
									likes: "",
									date: ""
								};
								const ogTitle = document.querySelector("meta[property=\"og:title\"]");
								if (ogTitle) metadata.title = ogTitle.content || metadata.title;
								const ogImage = document.querySelector("meta[property=\"og:image\"]");
								if (ogImage) metadata.thumbnail = ogImage.content;
								const metaTags = document.querySelector("meta[name=\"keywords\"]");
								if (metaTags) metadata.tags = (metaTags.content || "").split(",").map((s) => s.trim());
								const authorMeta = document.querySelector("meta[name=\"author\"]");
								if (authorMeta) metadata.author = authorMeta.content;
								try {
									const texts = Array.from(document.querySelectorAll("span, p, h1, h2, h3, h4, a, div")).filter((el) => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3).map((el) => el.textContent?.trim() || "").filter((t) => t.length > 0);
									for (const text of texts) {
										const lower = text.toLowerCase();
										if (/^\d+(?:[kKmMbB])?\s*(?:views?|plays?)$/i.test(lower)) {
											if (!metadata.views) metadata.views = text;
										}
										if (/^\d+(?:[kKmMbB])?\s*(?:likes?)$/i.test(lower)) {
											if (!metadata.likes) metadata.likes = text;
										}
										if (/(?:ago|yesterday|today|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
											if (!metadata.date) metadata.date = text;
										}
									}
								} catch (e) {}
								const videos = Array.from(document.querySelectorAll("video"));
								let bestSrc = null;
								let maxScore = -1;
								for (const v of videos) {
									const rect = v.getBoundingClientRect();
									let score = rect.width * rect.height;
									if ((v.id + " " + v.className).toLowerCase().match(/player|main|primary|hero|video-js|vjs|jwplayer/)) score += 1e6;
									if (v.src && !v.src.startsWith("blob:")) {
										if (score > maxScore) {
											maxScore = score;
											bestSrc = v.src;
											if (!isNaN(v.duration)) metadata.duration = v.duration;
										}
									} else {
										const sources = Array.from(v.querySelectorAll("source"));
										for (const s of sources) if (s.src && !s.src.startsWith("blob:")) {
											if (score > maxScore) {
												maxScore = score;
												bestSrc = s.src;
												if (!isNaN(v.duration)) metadata.duration = v.duration;
											}
										}
									}
								}
								if (!bestSrc) {
									const wildcards = document.querySelectorAll("[src*=\".mp4\"], [src*=\".m3u8\"], [src*=\".webm\"]");
									for (const w of Array.from(wildcards)) {
										const src = w.src;
										if (src && !src.startsWith("blob:")) {
											bestSrc = src;
											break;
										}
									}
								}
								return {
									src: bestSrc,
									metadata
								};
							};
							let result = findBestVideoAndMeta();
							if (!result.src) {
								await delay(2500);
								result = findBestVideoAndMeta();
							}
							return result;
						}
					}))[0]?.result;
					if (foundResult?.src) cleanup(foundResult, "Script injection success");
					else if (latestM3u8) cleanup({
						src: latestM3u8,
						metadata: defaultMetadata
					}, "Fallback to intercepted network m3u8");
					else setTimeout(() => {
						if (latestM3u8) cleanup({
							src: latestM3u8,
							metadata: defaultMetadata
						}, "Late intercepted network m3u8");
					}, 2e3);
				} catch (e) {}
			};
		} catch (e) {
			cleanup(null, "Internal isolation error");
		}
	});
}
/**
* Singleton Dashboard Opener
*/
async function openDashboard() {
	const url = import_browser_polyfill.default.runtime.getURL("dashboard-v2.html");
	const tabs = await import_browser_polyfill.default.tabs.query({ url });
	if (tabs.length > 0) {
		await import_browser_polyfill.default.tabs.update(tabs[0].id, { active: true });
		if (tabs[0].windowId) await import_browser_polyfill.default.windows.update(tabs[0].windowId, { focused: true });
	} else await import_browser_polyfill.default.tabs.create({ url });
}
/**
* Core Capture Processing Logic
*/
async function runCapturePipeline(data, tabId, windowId) {
	try {
		const targetUrl = data.url;
		let finalSrc = data.url;
		if (!finalSrc.endsWith(".mp4") && !finalSrc.endsWith(".webm") && !finalSrc.endsWith(".m3u8")) {
			const extracted = await doTabExtraction(targetUrl);
			if (extracted && extracted.src) {
				finalSrc = extracted.src;
				data.type = "video";
				if (extracted.metadata) {
					if (extracted.metadata.thumbnail) data.thumbnail = extracted.metadata.thumbnail;
					if (extracted.metadata.duration) data.duration = extracted.metadata.duration;
					if (extracted.metadata.title) data.title = extracted.metadata.title;
					if (extracted.metadata.tags && extracted.metadata.tags.length > 0) data.tags = extracted.metadata.tags;
					if (extracted.metadata.author) data.author = extracted.metadata.author;
					if (extracted.metadata.views) data.views = extracted.metadata.views;
					if (extracted.metadata.likes) data.likes = extracted.metadata.likes;
					if (extracted.metadata.date) data.date = extracted.metadata.date;
				}
			}
		}
		data.rawVideoSrc = finalSrc;
		if (!data.thumbnail && tabId && windowId) try {
			data.thumbnail = await import_browser_polyfill.default.tabs.captureVisibleTab(windowId, {
				format: "jpeg",
				quality: 20
			});
		} catch (captureErr) {}
		const saved = await getSavedVideos();
		saved.push(data);
		await saveVideos(saved);
		/**
		* Trigger Background Preview Generation (Async)
		* No need to await this as we want primary capture to finish immediately.
		*/
		if (data.rawVideoSrc) setupOffscreenDocument().then(() => {
			import_browser_polyfill.default.runtime.sendMessage({
				action: "generate_preview",
				data: {
					url: data.rawVideoSrc,
					duration: typeof data.duration === "number" ? data.duration : 60
				}
			});
		});
		return {
			success: true,
			data
		};
	} catch (err) {
		return {
			success: false,
			message: err.message
		};
	}
}
/**
* Offscreen Management
*/
async function setupOffscreenDocument() {
	const offscreenUrl = "src/offscreen/processor.html";
	try {
		if ((await import_browser_polyfill.default.runtime.getContexts({
			contextTypes: ["OFFSCREEN_DOCUMENT"],
			documentUrls: [import_browser_polyfill.default.runtime.getURL(offscreenUrl)]
		})).length > 0) return;
	} catch (e) {}
	try {
		await import_browser_polyfill.default.offscreen.createDocument({
			url: offscreenUrl,
			reasons: [
				"DOM_PARSER",
				"AUDIO_PLAYBACK",
				"BLOBS"
			],
			justification: "FFmpeg WASM processing for video previews"
		});
	} catch (e) {}
}
/**
* Message Dispatcher
*/
import_browser_polyfill.default.runtime.onMessage.addListener((request, sender) => {
	if (request.action === "extract_fresh_m3u8") return doTabExtraction(request.url).then((res) => ({ src: res?.src || null }));
	if (request.action === "open_dashboard") {
		openDashboard();
		return true;
	}
	if (request.action === "process_capture") return runCapturePipeline(request.data, sender?.tab?.id, sender?.tab?.windowId);
	if (request.action === "generate_preview") {
		setupOffscreenDocument().then(() => {
			import_browser_polyfill.default.runtime.sendMessage(request);
		});
		return true;
	}
	return false;
});
/**
* Handle Extension Action (Icon Click)
*/
import_browser_polyfill.default.action.onClicked.addListener(() => {
	openDashboard();
});
/**
* Handle Commands (Keyboard Shortcuts)
*/
import_browser_polyfill.default.commands.onCommand.addListener(async (command) => {
	if (command === "_execute_action" || command === "open-dashboard") openDashboard();
	else if (command === "capture-video") try {
		const activeTab = (await import_browser_polyfill.default.tabs.query({
			active: true,
			currentWindow: true
		}))[0];
		if (!activeTab?.id || !activeTab.url || activeTab.url.startsWith("chrome:")) return;
		try {
			if (!await import_browser_polyfill.default.tabs.sendMessage(activeTab.id, { type: "capture-video" })) throw new Error("No response from content script");
		} catch (error) {
			try {
				await import_browser_polyfill.default.scripting.executeScript({
					target: { tabId: activeTab.id },
					func: () => {
						alert("[Favorites Central] Extension script is not active on this page. Please refresh the page to enable video capture.");
					}
				});
			} catch (e) {}
		}
	} catch (error) {}
});
//#endregion

//# sourceMappingURL=background.js.map