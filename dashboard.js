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
  if (theme === "light") {
    themeToggle.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  } else {
    themeToggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }
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
  listEl.innerHTML = "";
  
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
    listEl.innerHTML = `<div class="empty-state">No items found matching your criteria.</div>`;
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
      header.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
        ${groupName} (${items.length})
      `;
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

        card.innerHTML = `
          <button data-index="${vid.originalIndex}" class="delete" title="Delete">
            <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="thumb-wrapper">
            <img src="${vid.thumbnail || 'https://via.placeholder.com/300x168/161b22/FFFFFF?text=No+Preview'}" alt="Thumbnail">
            ${durationBadge}
          </div>
          <div class="card-content">
            <div class="title-area">
              <div class="title" title="${vid.title}">${vid.title}</div>
              <div class="meta-info">
                <span class="badge">${typeBadge}</span>
                <span>${dateStr}</span>
              </div>
              ${extraMeta ? `<div class="extra-meta">${extraMeta}</div>` : ''}
            </div>
          </div>
        `;
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

function openModal(rawUrl, embedUrl) {
  modalBody.innerHTML = "";
  videoModal.classList.add("active");

  if (embedUrl) {
    modalBody.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  } else if (rawUrl.match(/\.(mp4|webm|ogg)$/i)) {
    modalBody.innerHTML = `<video src="${rawUrl}" controls autoplay></video>`;
  } else {
    // Attempt to fetch the URL via the background script to bypass CORS restrictions
    modalBody.innerHTML = `<div style="display:flex; height:100%; align-items:center; justify-content:center; color:white; font-family:sans-serif;">Extracting video source...</div>`;
    
    browser.runtime.sendMessage({ action: "fetch_html", url: rawUrl }).then(response => {
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
            modalBody.innerHTML = `<video src="${videoSrc}" controls autoplay></video>`;
        } else {
            // Unsuccessful extraction: Fall back to just loading the page inside an iframe
            modalBody.innerHTML = `<iframe src="${rawUrl}" allow="autoplay; fullscreen" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>`;
        }
      } else {
        // Fallback to iframe if fetch fails
        modalBody.innerHTML = `<iframe src="${rawUrl}" allow="autoplay; fullscreen" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>`;
      }
    });
  }
}

function closeVideoModal() {
  videoModal.classList.remove("active");
  modalBody.innerHTML = ""; // Drop iframe to kill audio/video
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
    
    // If it's tagged as a video or we can parse a direct embed, intercept it
    const embedUrl = getEmbedUrl(url);
    if (type === "video" || embedUrl || (url && url.match(/\.(mp4|webm|ogg)$/i))) {
        e.preventDefault();
        openModal(url, embedUrl);
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
