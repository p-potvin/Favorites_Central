// Listen for the "capture" request from the background script
browser.runtime.onMessage.addListener((request) => {
  if (request.action === "get_video_data") {
    if (hoveredElement) {
      let targetLink = hoveredElement.closest("a") || hoveredElement;
      addPermanentHeart(targetLink);
    }
    return Promise.resolve(extractData(hoveredElement));
  } else if (request.action === "show_notification") {
    showNotification(request.type, request.message);
  }
});

let hoveredElement = null;

// Track the element currently under the mouse
document.addEventListener("mousemove", (e) => {
  hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
});

function addPermanentHeart(el) {
  if (!el || el.querySelector(".favorites-central-heart")) return;
  
  if (window.getComputedStyle(el).position === "static") {
    el.style.position = "relative";
  }
  
  const heart = document.createElement("div");
  heart.className = "favorites-central-heart";
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "#ef4444");
  svg.setAttribute("stroke", "white");
  svg.setAttribute("stroke-width", "1.5");
  Object.assign(svg.style, {
    width: "16px",
    height: "16px",
    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
    display: "block"
  });

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
  
  svg.appendChild(path);
  heart.appendChild(svg);
  
  Object.assign(heart.style, {
    position: "absolute",
    top: "4px",
    left: "4px",
    zIndex: "2147483647",
    pointerEvents: "none"
  });
  
  el.appendChild(heart);
}

async function highlightSavedElements() {
  try {
    const data = await browser.storage.local.get({ savedVideos: [] });
    if (!data.savedVideos || data.savedVideos.length === 0) return;
    
    const savedUrls = new Set(data.savedVideos.map(v => v.url));
    const links = document.querySelectorAll("a");
    
    links.forEach(link => {
      if (savedUrls.has(link.href)) {
        addPermanentHeart(link);
      }
    });
  } catch(e) {}
}

// Run on page load and observe DOM changes for SPAs (like YouTube/Twitter)
window.addEventListener("load", highlightSavedElements);
setTimeout(highlightSavedElements, 2000); // Failsafe for initial late renders

let mutationTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(mutationTimeout);
  mutationTimeout = setTimeout(highlightSavedElements, 1000);
});
observer.observe(document.body, { childList: true, subtree: true });

function showNotification(type, message) {
  const existing = document.getElementById("favorites-central-notification");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.id = "favorites-central-notification";
  el.textContent = message;
  
  Object.assign(el.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "16px 24px",
    borderRadius: "8px",
    zIndex: "999999",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    opacity: "0",
    transform: "translateY(20px)",
    pointerEvents: "none"
  });

  if (type === "success") {
    el.style.backgroundColor = "#10b981"; // cool green
    
    if (hoveredElement) {
      let targetLink = hoveredElement.closest("a") || hoveredElement;
      addPermanentHeart(targetLink);
    }
  } else if (type === "removed") {
    el.style.backgroundColor = "#f97316"; // orange
    
    if (hoveredElement) {
      let targetLink = hoveredElement.closest("a") || hoveredElement;
      let heart = targetLink.querySelector(".favorites-central-heart");
      if (heart) heart.remove();
    }
  } else {
    el.style.backgroundColor = "#ef4444"; // modern red
    
    // Remove optimistic heart if capture failed or background process failed
    if (hoveredElement) {
      let targetLink = hoveredElement.closest("a") || hoveredElement;
      let hearts = targetLink.querySelectorAll(".favorites-central-heart");
      hearts.forEach(h => h.remove());
    }
  }

  document.body.appendChild(el);

  // Trigger animation
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function extractTitle(el, link) {
  let title = "";
  
  // 1. Try to find a title attribute on the hovered element itself
  if (el && el.getAttribute) {
    title = el.getAttribute("title") || el.getAttribute("aria-label") || el.getAttribute("alt");
    if (title) return title.trim();
  }
  
  // 2. Try the wrapping link's attributes
  if (link && link.getAttribute) {
    title = link.getAttribute("title") || link.getAttribute("aria-label");
    if (title) return title.trim();
  }
  
  // 3. Look for a nearby span or heading element with text
  let container = link || el;
  if (container) {
    const textSelectors = ["span", "h1", "h2", "h3", "h4", "h5", "h6", "p", "div"];
    for (const selector of textSelectors) {
      // Look inside the element 
      let found = container.querySelector(selector);
      if (found && found.textContent.trim().length > 2) {
        return found.textContent.trim();
      }
    }
    
    // Look in the parent/siblings
    if (container.parentElement) {
       for (const selector of textSelectors) {
         let found = container.parentElement.querySelector(selector);
         if (found && found.textContent.trim().length > 2) {
           return found.textContent.trim();
         }
       }
    }

    // Use direct textual content if nothing better is formatted
    if (container.textContent && container.textContent.trim().length > 2) {
        // basic cleanup to ensure we don't pass huge blobs of text
        let cleanText = container.textContent.trim().replace(/\\n/g, " ");
        if (cleanText.length < 150) {
            return cleanText;
        }
    }
  }

  return document.title;
}

function extractData(el) {
  if (!el) el = document.body;

  let link = el.tagName === "A" ? el : el.closest("a");
  let video = el.tagName === "VIDEO" ? el : el.querySelector("video") || el.closest("video");
  let image = el.tagName === "IMG" ? el : el.querySelector("img") || el.closest("img");

  // Aggressively hunt for nearby media if we clicked a blind container overlay
  if (!video && !image) {
      let container = el.parentElement;
      for (let i = 0; i < 3 && container; i++) {
          if (!video) video = container.querySelector("video");
          if (!image) image = container.querySelector("img");
          if (video || image) break;
          container = container.parentElement;
      }
  }

  let sourceUrl = window.location.href;
  let thumb = "";
  let type = "link";
  let rawVideoSrc = null;

  // 1. Determine best URL
  if (link && link.href) {
    sourceUrl = link.href;
  }

  // 2. Determine best Thumbnail
  if (image && image.src) {
      thumb = image.src;
  } else if (video) {
      let nearbyImg = video.parentElement ? video.parentElement.querySelector("img") : null;
      if (nearbyImg && nearbyImg.src) {
          thumb = nearbyImg.src;
      } else if (video.poster) {
          thumb = video.poster;
      } else {
          thumb = captureFrame(video);
      }
  }

  // 3. Determine Type & Video Source Extraction
  if (video) {
      type = "video";
      
      // Stop raw extract ONLY if this link is navigating us away to a DIFFERENT page 
      // (because we want background.js to fetch the real source from that destination page!)
      let linkIsExternal = link && link.href && link.href.split('#')[0] !== window.location.href.split('#')[0];

      if (!linkIsExternal) {
          rawVideoSrc = video.src || video.currentSrc;
          if (rawVideoSrc && rawVideoSrc.startsWith('blob:')) rawVideoSrc = null;
          if (!rawVideoSrc) {
              let sourceTag = video.querySelector("source");
              if (sourceTag) rawVideoSrc = sourceTag.src;
              if (rawVideoSrc && rawVideoSrc.startsWith('blob:')) rawVideoSrc = null;
          }
      } else {
          // Downgrade to link so background knows to fetch the destination properly
          type = "link"; 
      }
  } else if (image && (!link || link.href === window.location.href)) {
      type = "image";
  }

  if (rawVideoSrc && rawVideoSrc.startsWith("/")) {
      try { rawVideoSrc = new URL(rawVideoSrc, window.location.href).href; } catch(e){}
  }

  // Find a smart title
  let smartTitle = extractTitle(el, link || video?.closest("a") || image?.closest("a"));
  
  // Extract extra metadata
  let metadata = extractMetadataOverrides(el, link || video?.closest("a") || image?.closest("a"), smartTitle);
  
  // Clean up title if it contains duration
  if (metadata.duration && smartTitle.includes(metadata.duration)) {
      smartTitle = smartTitle.replace(metadata.duration, "").replace(/^[\]\)\-\|]+|[\[\(\-\|]+$/g, "").trim();
  }

  let domain = "Unknown";
  try {
    domain = new URL(sourceUrl).hostname;
  } catch(e) {}

  return {
    url: sourceUrl,
    rawVideoSrc: rawVideoSrc,
    title: smartTitle,
    thumbnail: thumb,
    timestamp: Date.now(),
    type: type,
    domain: domain.replace(/^www\\./, ""),
    duration: metadata.duration,
    views: metadata.views,
    uploaded: metadata.uploaded
  };
}

function extractMetadataOverrides(el, link, titleText) {
    let metadata = {
        duration: null,
        views: null,
        uploaded: null
    };
    
    // 1. Check title string for a duration (e.g. 10:24, 1:04:22, etc)
    const durationRegex = /(\d{1,2}:)?(\d{1,2}:\d{2})/;
    let durationMatch = titleText.match(durationRegex);
    if (durationMatch) {
       metadata.duration = durationMatch[0];
    }
    
    // 2. Search attributes and siblings for metadata strings
    let container = link || el;
    let ariaLabel = "";
    if (container && container.getAttribute) {
         ariaLabel = container.getAttribute("aria-label") || "";
    }
    
    let combinedText = ariaLabel + " " + titleText;
    
    // Attempt to gather more text from nearby container text nodes
    if (container && container.parentElement) {
         combinedText += " " + container.parentElement.textContent || "";
    }
    
    // Look for views (e.g., 1.5M views, 24K views, 100 views)
    const viewsRegex = /\b(\d+(?:\.\d+)?[KkBbMm]?\s?views?)\b/i;
    let viewsMatch = combinedText.match(viewsRegex);
    if (viewsMatch) {
        metadata.views = viewsMatch[1].trim();
    }
    
    // Look for time since upload (e.g., 2 hours ago, 1 year ago)
    const uploadedRegex = /\b(\d+\s+(?:second|minute|hour|day|week|month|year)s?\s+ago)\b/i;
    let uploadedMatch = combinedText.match(uploadedRegex);
    if (uploadedMatch) {
        metadata.uploaded = uploadedMatch[1].trim();
    }
    
     // If duration wasn't in title, check around in combined text
    if (!metadata.duration) {
         let fallbackDurationMatch = combinedText.match(durationRegex);
         if (fallbackDurationMatch) {
             metadata.duration = fallbackDurationMatch[0];
         }
    }
    
    return metadata;
}

function captureFrame(video) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || video.clientWidth || 1280;
    canvas.height = video.videoHeight || video.clientHeight || 720;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.9);
  } catch (e) {
    return "";
  }
}
