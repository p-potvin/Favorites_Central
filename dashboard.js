let allVideos = [];
// DOM Elements
const listEl = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const groupBySel = document.getElementById("groupBy");
const filterTypeSel = document.getElementById("filterType");
const sortBySel = document.getElementById("sortBy");
const sizeSlider = document.getElementById("sizeSlider");
const themeToggle = document.getElementById("themeToggle");

let state = {
  search: "",
  group: "domain",
  filter: "all",
  sort: "dateDesc",
  size: "5",
  collapsedGroups: {},
  groupPages: {},
  sidebarCollapsed: false
};

// Theme Detection Logic
let currentTheme = localStorage.getItem("theme");
if (!currentTheme) {
  currentTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");

  if (theme === "light") {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "5");
    svg.appendChild(circle);

    const lines = [
      { x1: "12", y1: "1", x2: "12", y2: "3" },
      { x1: "12", y1: "21", x2: "12", y2: "23" },
      { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" },
      { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" },
      { x1: "1", y1: "12", x2: "3", y2: "12" },
      { x1: "21", y1: "12", x2: "23", y2: "12" },
      { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" },
      { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" }
    ];

    lines.forEach(l => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      Object.entries(l).forEach(([k, v]) => line.setAttribute(k, v));
      svg.appendChild(line);
    });
  } else {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
    svg.appendChild(path);
  }
  themeToggle.appendChild(svg);
}

try {
  const savedState = JSON.parse(localStorage.getItem("dashboardState"));
  if (savedState) {
    state = { ...state, ...savedState };
  }
} catch(e) {}

function saveState() {
  localStorage.setItem("dashboardState", JSON.stringify(state));
}

// Sidebar logic
const sidebar = document.querySelector("aside");
const sidebarToggle = document.getElementById("sidebarToggle");

if (state.sidebarCollapsed) {
  sidebar.classList.add("collapsed");
}

sidebarToggle.addEventListener("click", () => {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
  saveState();
  // We need to re-render after a tiny delay to let the animation allow new widths for grid calculations
  setTimeout(render, 350); 
});

async function init() {
  const data = await browser.storage.local.get({ savedVideos: [] });
  allVideos = data.savedVideos.map((v, i) => ({ ...v, originalIndex: i }));

  searchInput.value = state.search;
  groupBySel.value = state.group;
  filterTypeSel.value = state.filter;
  sortBySel.value = state.sort;
  sizeSlider.value = state.size;
  
  // Event listeners
  searchInput.addEventListener("input", e => { state.search = e.target.value.toLowerCase(); saveState(); render(); });
  groupBySel.addEventListener("change", e => { state.group = e.target.value; saveState(); render(); });
  filterTypeSel.addEventListener("change", e => { state.filter = e.target.value; saveState(); render(); });
  sortBySel.addEventListener("change", e => { state.sort = e.target.value; saveState(); render(); });
  sizeSlider.addEventListener("input", e => { state.size = e.target.value; saveState(); render(); });

  render();
}

function render() {
  listEl.textContent = "";
  
  // 1. Filter
  let filtered = allVideos.filter(v => {
    if (state.filter !== "all" && v.type !== state.filter) return false;
    if (state.search) {
      if (!v.title.toLowerCase().includes(state.search) && !(v.domain || "").toLowerCase().includes(state.search)) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No items found matching your criteria.";
    listEl.appendChild(emptyState);
    return;
  }

  // 2. Sort
  filtered.sort((a, b) => {
    if (state.sort === "dateDesc") return (b.timestamp || 0) - (a.timestamp || 0);
    if (state.sort === "dateAsc") return (a.timestamp || 0) - (b.timestamp || 0);
    if (state.sort === "nameAsc") return a.title.localeCompare(b.title);
    if (state.sort === "nameDesc") return b.title.localeCompare(a.title);
    return 0;
  });

  // 3. Group
  let groups = {};
  if (state.group === "none") {
    groups["All Items"] = filtered;
  } else {
    filtered.forEach(v => {
      let key = state.group === "domain" ? (v.domain || "Unknown Website") : (v.type || "link").toUpperCase();
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    });
  }

  const layoutClass = `layout-${state.size}`;

  // Calculate Page Size dynamically
  let pageSize = Infinity;
  if (state.size !== "1") {
    // Determine the active width by checking the main container width minus ~64px padding
    const mainWidth = document.querySelector("main").clientWidth - 64; 
    let minWidth = 220; // default layout-5
    switch(state.size) {
        case "2": minWidth = 100; break;
        case "3": minWidth = 140; break;
        case "4": minWidth = 180; break;
        case "5": minWidth = 220; break;
    }
    const columns = Math.max(1, Math.floor((mainWidth + 24) / (minWidth + 24)));
    pageSize = columns * 2; // Display exactly 2 rows
  }

  // 4. Render
  for (const [groupName, items] of Object.entries(groups)) {
    const isCollapsed = state.collapsedGroups[groupName];
    
    if (state.group !== "none") {
      const header = document.createElement("div");
      header.className = "group-header" + (isCollapsed ? " collapsed" : "");
      
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M7 10l5 5 5-5z");
      svg.appendChild(path);
      
      header.appendChild(svg);
      header.appendChild(document.createTextNode(` ${groupName} (${items.length})`));
      
      header.addEventListener("click", () => {
        state.collapsedGroups[groupName] = !isCollapsed;
        saveState();
        render();
      });
      listEl.appendChild(header);
    }

    if (!isCollapsed || state.group === "none") {
      const groupContainer = document.createElement("div");
      groupContainer.className = `group-container ${layoutClass}`;
      
      const currentPage = state.groupPages[groupName] || 1;
      const totalPages = Math.ceil(items.length / pageSize);
      const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
      
      // Update state if out of bounds due to array shrink
      if (safeCurrentPage !== currentPage) {
          state.groupPages[groupName] = safeCurrentPage;
      }
      
      const startIdx = (safeCurrentPage - 1) * pageSize;
      const paginatedItems = items.slice(startIdx, startIdx + pageSize);
      
      paginatedItems.forEach(vid => {
        const card = document.createElement("a");
        card.href = vid.url;
        card.target = "_blank";
        card.className = "card";
        const dateStr = vid.timestamp ? new Date(vid.timestamp).toLocaleDateString() : "Unknown Date";
        const typeBadge = vid.type ? vid.type : "link";
        
        let extraMeta = "";
        if (vid.views) extraMeta += `<span>${vid.views}</span>`;
        if (vid.uploaded) extraMeta += `<span>• ${vid.uploaded}</span>`;
        
        let durationBadge = "";
        if (vid.duration) {
            durationBadge = `<div class="duration-badge">${vid.duration}</div>`;
        }

        // Keep a ref on dataset for modal parsing
        card.dataset.url = vid.url;
        card.dataset.type = typeBadge;
          if (vid.rawVideoSrc) {
              card.dataset.rawsrc = vid.rawVideoSrc;
          }

          const deleteBtn = document.createElement("button");
          deleteBtn.dataset.index = vid.originalIndex;
          deleteBtn.className = "delete";
          deleteBtn.title = "Delete";
          const delSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          delSvg.setAttribute("viewBox", "0 0 24 24");
          const delPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          delPath.setAttribute("d", "M18 6L6 18M6 6l12 12");
          delSvg.appendChild(delPath);
          deleteBtn.appendChild(delSvg);
          card.appendChild(deleteBtn);

          const thumbWrapper = document.createElement("div");
          thumbWrapper.className = "thumb-wrapper";
          const thumbImg = document.createElement("img");
          thumbImg.src = vid.thumbnail || 'https://via.placeholder.com/300x168/161b22/FFFFFF?text=No+Preview';
          thumbImg.alt = "Thumbnail";
          thumbWrapper.appendChild(thumbImg);
          if (vid.duration) {
              const durationBadgeEl = document.createElement("div");
              durationBadgeEl.className = "duration-badge";
              durationBadgeEl.textContent = vid.duration;
              thumbWrapper.appendChild(durationBadgeEl);
          }
          card.appendChild(thumbWrapper);

          const cardContent = document.createElement("div");
          cardContent.className = "card-content";
          const titleArea = document.createElement("div");
          titleArea.className = "title-area";
          const titleEl = document.createElement("div");
          titleEl.className = "title";
          titleEl.title = vid.title;
          titleEl.textContent = vid.title;
          titleArea.appendChild(titleEl);

          const metaInfo = document.createElement("div");
          metaInfo.className = "meta-info";
          const typeBadgeEl = document.createElement("span");
          typeBadgeEl.className = "badge";
          typeBadgeEl.textContent = typeBadge;
          metaInfo.appendChild(typeBadgeEl);
          const dateSpan = document.createElement("span");
          dateSpan.textContent = dateStr;
          metaInfo.appendChild(dateSpan);
          titleArea.appendChild(metaInfo);

          if (vid.views || vid.uploaded) {
              const extraMetaEl = document.createElement("div");
              extraMetaEl.className = "extra-meta";
              if (vid.views) {
                  const viewSpan = document.createElement("span");
                  viewSpan.textContent = vid.views;
                  extraMetaEl.appendChild(viewSpan);
              }
              if (vid.uploaded) {
                  const uploadSpan = document.createElement("span");
                  uploadSpan.textContent = (vid.views ? " • " : "") + vid.uploaded;
                  extraMetaEl.appendChild(uploadSpan);
              }
              titleArea.appendChild(extraMetaEl);
          }
          cardContent.appendChild(titleArea);
          card.appendChild(cardContent);
          
          groupContainer.appendChild(card);
      });
      
      listEl.appendChild(groupContainer);

      if (totalPages > 1) {
        const pagination = document.createElement("div");
        pagination.className = "pagination";
        
        const prevBtn = document.createElement("button");
        prevBtn.className = "page-btn";
        prevBtn.textContent = "Previous";
        prevBtn.disabled = safeCurrentPage === 1;
        prevBtn.onclick = () => { 
          state.groupPages[groupName] = safeCurrentPage - 1; 
          saveState(); 
          render(); 
        };
        
        const nextBtn = document.createElement("button");
        nextBtn.className = "page-btn";
        nextBtn.textContent = "Next";
        nextBtn.disabled = safeCurrentPage === totalPages;
        nextBtn.onclick = () => { 
          state.groupPages[groupName] = safeCurrentPage + 1; 
          saveState(); 
          render(); 
        };
        
        const pageInfo = document.createElement("span");
        pageInfo.textContent = `Page ${safeCurrentPage} of ${totalPages}`;
        
        pagination.appendChild(prevBtn);
        pagination.appendChild(pageInfo);
        pagination.appendChild(nextBtn);
        listEl.appendChild(pagination);
      }
    }
  }
}

// --- Video Embed Logic ---
function getEmbedUrl(url) {
  try {
    const stringUrl = String(url);
    if (stringUrl.includes("youtube.com") || stringUrl.includes("youtu.be")) {
      const match = stringUrl.match(/(?:v=|youtu\.be\/)([^&?]+)/);
      if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    }
    if (stringUrl.includes("vimeo.com")) {
      const match = stringUrl.match(/vimeo\.com\/(\d+)/);
      if (match && match[1]) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    if (stringUrl.includes("dailymotion.com")) {
      const match = stringUrl.match(/dailymotion\.com\/video\/([^_]+)/) || stringUrl.match(/dai\.ly\/([^_]+)/);
      if (match && match[1]) return `https://www.dailymotion.com/embed/video/${match[1]}?autoplay=1`;
    }
  } catch(e) {}
  return null;
}

const videoModal = document.getElementById("videoModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

function openModal(rawUrl, embedUrl, rawVideoSrc) {
  modalBody.textContent = "";
  videoModal.classList.add("active");

  const createContainer = (content) => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "100%";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.color = "white";
    container.style.fontFamily = "sans-serif";
    container.style.textAlign = "center";
    if (typeof content === "string") {
      container.textContent = content;
    } else {
      container.appendChild(content);
    }
    return container;
  };

  // 1. If we recorded the hot .mp4 source at the exact moment of liking, play it instantly!
  if (rawVideoSrc) {
      if (rawVideoSrc.includes(".m3u8")) {
         // m3u8 links usually have expired signatures! Let's live-fetch a fresh one via the background tab
         const loading = createContainer("");
         const p1 = document.createElement("p");
         p1.textContent = "Fetching fresh HLS playlist (m3u8) to bypass expired signatures...";
         const p2 = document.createElement("p");
         p2.style.fontSize = "0.8rem";
         p2.style.color = "#aaa";
         p2.textContent = "This takes a few seconds.";
         loading.appendChild(p1);
         loading.appendChild(p2);
         modalBody.appendChild(loading);

         browser.runtime.sendMessage({ action: "extract_fresh_m3u8", url: rawUrl }).then(response => {
            const finalSrc = (response && response.src) ? response.src : rawVideoSrc; // fallback to old if failed
            modalBody.textContent = "";
            
            const copyBox = document.createElement("div");
            copyBox.style.position = "absolute";
            copyBox.style.top = "10px";
            copyBox.style.left = "10px";
            copyBox.style.zIndex = "1000";
            copyBox.style.background = "rgba(0,0,0,0.6)";
            copyBox.style.padding = "5px 10px";
            copyBox.style.borderRadius = "4px";

            const input = document.createElement("input");
            input.type = "text";
            input.value = finalSrc;
            input.readOnly = true;
            input.style.background = "transparent";
            input.style.border = "none";
            input.style.color = "#1f6feb";
            input.style.width = "200px";
            input.style.fontSize = "0.8rem";
            input.title = "Click to copy m3u8 url";
            input.onclick = () => { input.select(); document.execCommand('copy'); };
            copyBox.appendChild(input);
            modalBody.appendChild(copyBox);

            const video = document.createElement("video");
            video.src = finalSrc;
            video.controls = true;
            video.autoplay = true;
            video.style.width = "100%";
            video.style.height = "100%";
            modalBody.appendChild(video);
         });
         return;
      }

      const video = document.createElement("video");
      video.src = rawVideoSrc;
      video.controls = true;
      video.autoplay = true;
      modalBody.appendChild(video);
      return;
  }

  // 2. Play standard known embeds
  if (embedUrl) {
    const iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.setAttribute("allow", "autoplay; fullscreen");
    iframe.allowFullscreen = true;
    modalBody.appendChild(iframe);
  } 
  // 3. Play direct links
  else if (rawUrl.match(/\.(mp4|webm|ogg|m3u8)$/i)) {
    const video = document.createElement("video");
    video.src = rawUrl;
    video.controls = true;
    video.autoplay = true;
    modalBody.appendChild(video);
  } 
  // 4. Try guessing fallback via background fetch
  else {
    // Attempt to fetch the URL via the background script to bypass CORS restrictions
    modalBody.appendChild(createContainer("Extracting video source..."));
    
    browser.runtime.sendMessage({ action: "fetch_html", url: rawUrl }).then(response => {
      modalBody.textContent = "";
      if (response && response.html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.html, "text/html");
        
        let videoSrc = "";
        
        // 1. Try og:video meta tags
        const ogMeta = doc.querySelector('meta[property="og:video"], meta[property="og:video:url"], meta[name="twitter:player:stream"]');
        if (ogMeta && ogMeta.content && ogMeta.content.match(/\.(mp4|webm|ogg)/i)) {
             videoSrc = ogMeta.content;
        }
        
        // 2. Try looking for native <video> tags
        if (!videoSrc) {
            const videoTag = doc.querySelector("video source, video");
            if (videoTag) {
                videoSrc = videoTag.src || videoTag.currentSrc || videoTag.getAttribute("src");
                // Resolve relative URLs using standard URL constructor
                if (videoSrc) {
                    try { videoSrc = new URL(videoSrc, rawUrl).href; } catch(e){}
                }
            }
        }
        
        if (videoSrc) {
            const video = document.createElement("video");
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            modalBody.appendChild(video);
        } else {
            // Unsuccessful extraction: Fall back to just loading the page inside an iframe
            const iframe = document.createElement("iframe");
            iframe.src = rawUrl;
            iframe.setAttribute("allow", "autoplay; fullscreen");
            iframe.allowFullscreen = true;
            iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
            modalBody.appendChild(iframe);
        }
      } else {
        // Fallback to iframe if fetch fails
        const iframe = document.createElement("iframe");
        iframe.src = rawUrl;
        iframe.setAttribute("allow", "autoplay; fullscreen");
        iframe.allowFullscreen = true;
        iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
        modalBody.appendChild(iframe);
      }
    });
  }
}

function closeVideoModal() {
  videoModal.classList.remove("active");
  modalBody.textContent = ""; // Drop iframe to kill audio/video
}

closeModalBtn.addEventListener("click", closeVideoModal);
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) closeVideoModal();
});

document.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    e.preventDefault();
    e.stopPropagation();
    const idx = parseInt(deleteBtn.dataset.index, 10);
    const data = await browser.storage.local.get({ savedVideos: [] });
    data.savedVideos.splice(idx, 1);
    await browser.storage.local.set({ savedVideos: data.savedVideos });
    // Reload state
    init();
    return;
  }
  
  const card = e.target.closest(".card");
  if (card) {
    const url = card.dataset.url;
    const type = card.dataset.type;
    const rawVideoSrc = card.dataset.rawsrc; // Read the recorded source if available
    
    // If it's tagged as a video or we can parse a direct embed, intercept it
    const embedUrl = getEmbedUrl(url);
    if (type === "video" || embedUrl || (url && url.match(/\.(mp4|webm|ogg|m3u8)$/i)) || (rawVideoSrc && rawVideoSrc !== "null" && rawVideoSrc !== "undefined")) {
        e.preventDefault();
        openModal(url, embedUrl, (rawVideoSrc !== "undefined" && rawVideoSrc !== "null") ? rawVideoSrc : null);
    }
  }
});

let resizeTimer;
window.addEventListener("resize", () => {
  if (state.size !== "1") {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 250);
  }
});

init();
