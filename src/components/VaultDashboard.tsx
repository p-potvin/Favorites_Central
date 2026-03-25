import browser from 'webextension-polyfill';
import { getSavedVideos, saveVideos } from '../lib/storage-vault';
import { getPreview } from '../lib/dexie-store'; // Added for binary previews
import { type VideoData } from '../types/schemas';
import { Heart, Search, Shield, Settings, Palette, Menu, FolderTree, ArrowDownAZ, LayoutTemplate, ChevronRight, ChevronLeft, ArrowLeft, Trash2, Edit2, Play, X, AlertTriangle, RefreshCw, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import React, { useEffect, useState, useMemo, useRef } from 'react';

/**
 * Preview Player Component
 * Handles the "YouTube-style" 10x2s hover preview
 */
const PreviewThumb: React.FC<{ video: VideoData }> = ({ video }) => {
  const [previewBlob, setPreviewBlob] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let active = true;
    const checkPreview = async () => {
      const blob = await getPreview(video.url);
      if (blob && active) {
        setPreviewBlob(URL.createObjectURL(blob));
      }
    };
    checkPreview();
    return () => { active = false; };
  }, [video.url]);

  const handleMouseEnter = async () => {
    setIsHovering(true);
    
    // Check if we already have it in state
    if (previewBlob) return;

    // Check if it exists in the database
    const blob = await getPreview(video.url);
    if (blob) {
      setPreviewBlob(URL.createObjectURL(blob));
      return;
    }

    /**
     * Recovery Logic: If more than 30s have elapsed since save and thumb is still missing,
     * the background job likely failed or was interrupted. Retrigger now.
     */
    const now = Date.now();
    const elapsed = now - video.timestamp;
    
    if (elapsed > 30000 && !isProcessing) {
      console.log(`[VaultAuth] Preview missing after ${elapsed}ms. Retriggering for:`, video.title);
      setIsProcessing(true);
      try {
        await browser.runtime.sendMessage({
          action: 'generate_preview',
          data: { 
            url: video.rawVideoSrc || video.url, 
            duration: typeof video.duration === 'number' ? video.duration : 60 
          }
        });
        
        // Poll briefly for the result
        const retryBlob = await getPreview(video.url);
        if (retryBlob) {
          setPreviewBlob(URL.createObjectURL(retryBlob));
        }
      } catch (e) {
        console.error("[VaultAuth] Manual retrigger failed:", e);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div 
      className="absolute inset-0 z-20 overflow-hidden bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && previewBlob ? (
        <video
          ref={videoRef}
          src={previewBlob}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isHovering ? "opacity-0" : "opacity-100"
          )} 
        />
      )}
      
      {isProcessing ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <RefreshCw className="text-vault-accent animate-spin" size={20} />
        </div>
      ) : (
        !previewBlob && isHovering && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-[8px] text-white px-1 rounded uppercase tracking-tighter">
            Processing...
          </div>
        )
      )}
    </div>
  );
};

export const VaultDashboard: React.FC = () => {
  const [items, setItems] = useState<VideoData[]>([]);
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState<keyof VideoData>('title');
  const [currentSkin, setCurrentSkin] = useState<number>(3);
  
  // Sidebar states
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [groupBy, setGroupBy] = useState('Hostname');
  const [sortBy, setSortBy] = useState<keyof VideoData | 'DateDesc' | 'DateAsc'>('DateDesc');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewSize, setViewSize] = useState<number>(3); // 1: Details, 2: Small, 3: Medium, 4: Large, 5: Biggest
  const [isDimmed, setIsDimmed] = useState(false); // Player Dimmer State

  // Layout & Pagination states
  const [isolatedGroup, setIsolatedGroup] = useState<string | null>(null);
  const [pages, setPages] = useState<Record<string, number>>({});
  const [sectionLimit, setSectionLimit] = useState(50);
  const mainRef = useRef<HTMLElement>(null);

  // Video Player Modal states
  const [playingVideo, setPlayingVideo] = useState<VideoData | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // PIN Settings
  const [pinSettings, setPinSettings] = useState<any>(null);

  // Browser Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFirefox] = useState(() => navigator.userAgent.toLowerCase().includes('firefox'));

  useEffect(() => {
    const savedSkin = localStorage.getItem('vault-skin');
    if (savedSkin) {
      const skinNum = parseInt(savedSkin, 10);
      setCurrentSkin(skinNum);
      const mode = (skinNum === 1 || skinNum === 4 || skinNum === 6 || skinNum === 9) ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', `skin-${skinNum}`);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'skin-3');
      document.documentElement.classList.add('dark');
    }

    const load = async () => {
      const settings = await getPinSettings();
      setPinSettings(settings);

      const all = await getSavedVideos();
      setItems(all || []);
    };
    load();
  }, []);

  const togglePin = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = e.target.checked;
    if (enabled) {
      const newPin = window.prompt("Enter a new 4 or 6 digit PIN:");
      if (newPin && (newPin.length === 4 || newPin.length === 6) && /^\d+$/.test(newPin)) {
        const updated = { ...pinSettings, enabled: true, pin: newPin, lastUnlocked: Date.now() };
        await savePinSettings(updated);
        setPinSettings(updated);
      } else {
        alert("Invalid PIN. It must be 4 or 6 digits.");
        e.target.checked = false;
      }
    } else {
      const updated = { ...pinSettings, enabled: false };
      await savePinSettings(updated);
      setPinSettings(updated);
    }
  };

  const updatePinLength = async (len: 4 | 6) => {
     const updated = { ...pinSettings, length: len };
     await savePinSettings(updated);
     setPinSettings(updated);
  };

  const updateLockTimeout = async (timeout: number) => {
     const updated = { ...pinSettings, lockTimeout: timeout };
     await savePinSettings(updated);
     setPinSettings(updated);
  };

  const cycleTheme = () => {
    const nextSkin = currentSkin === 9 ? 1 : currentSkin + 1;
    setCurrentSkin(nextSkin);
    const mode = (nextSkin === 1 || nextSkin === 4 || nextSkin === 6 || nextSkin === 9) ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', `skin-${nextSkin}`);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('vault-skin', nextSkin.toString());
  };

  // Infinite scroll
  const handleScroll = () => {
    if (!mainRef.current || isolatedGroup) return;
    const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setSectionLimit(prev => prev + 20); // soft load 20 more
    }
  };

  const filtered = useMemo(() => {
    return items.filter(f => {
      if (!search) return true;
      const targetValue = f[searchField];
      if (targetValue === null || targetValue === undefined) return false;
      const searchStr = search.toLowerCase();
      
      if (Array.isArray(targetValue)) {
        return targetValue.some(v => v.toString().toLowerCase().includes(searchStr));
      }
      
      return targetValue.toString().toLowerCase().includes(searchStr);
    });
  }, [items, search, searchField]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'DateDesc') return b.timestamp - a.timestamp;
      if (sortBy === 'DateAsc') return a.timestamp - b.timestamp;
      
      const valA = a[sortBy as keyof VideoData];
      const valB = b[sortBy as keyof VideoData];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = valA.toString().localeCompare(valB.toString());
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filtered, sortBy, sortOrder]);

  const grouped = useMemo(() => {
    if (groupBy === 'None') return { 'All Items': sorted };
    
    return sorted.reduce((acc, item) => {
      let key = 'Unknown';
      try {
        const urlObj = new URL(item.url);
        key = urlObj.hostname.replace(/^www\./, '');
      } catch (e) {}
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, VideoData[]>);
  }, [sorted, groupBy]);

  const viewClasses = {
    1: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2', // Details (List) - adjusted to fit more if needed
    2: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', // Small
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', // Medium
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', // Large
    5: 'grid-cols-1 xl:grid-cols-2', // Biggest
  };

  const itemsPerPageParams: Record<number, number> = {
    1: 6, // 1 col initially, 2 in md. Let's say 6.
    2: 10,
    3: 8,
    4: 6,
    5: 4
  };

  const maxItemsPerRow = itemsPerPageParams[viewSize];

  // If isolated, display that group. Else display UP TO `sectionLimit` groups.
  const groupsToRender = isolatedGroup 
    ? [ [isolatedGroup, grouped[isolatedGroup] || []] as const ]
    : Object.entries(grouped).slice(0, sectionLimit);

  // Helper to change page for a group
  const setGroupPage = (groupName: string, delta: number) => {
    setPages(prev => ({
      ...prev,
      [groupName]: Math.max(0, (prev[groupName] || 0) + delta)
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-vault-bg text-vault-text font-sans antialiased transition-colors duration-500">
      
      {/* HEADER */}
      <header className="flex-none h-16 flex items-center justify-between px-4 md:px-6 z-20 vault-card rounded-none border-t-0 border-x-0 border-b shadow-sm relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="vault-btn p-1.5 h-8 w-8 flex items-center justify-center border-none hover:bg-vault-cardBg"
          >
            <Shield size={20} className="text-vault-accent" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-vault-accent">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-1">
                Vault<span className="text-vault-accent font-light">Central</span>
              </h1>
              <p className="text-[9px] text-vault-muted font-medium tracking-wider uppercase">
                Secure Media Vault // <a href="https://vaultwares.com" target="_blank" rel="noreferrer" className="hover:text-vault-accent underline transition-colors">VaultWares.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex items-center gap-2">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as keyof VideoData)}
              className="bg-vault-cardBg border border-vault-border rounded-l-full px-3 py-1.5 text-xs text-vault-text focus:border-vault-accent outline-none appearance-none"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="domain">Domain</option>
              <option value="url">URL</option>
              <option value="quality">Quality</option>
              <option value="resolution">Res</option>
              <option value="description">Desc</option>
              <option value="tags">Tags</option>
            </select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vault-muted group-focus-within:text-vault-accent transition-colors" size={14} />
              <input 
                type="text"
                placeholder={`Search in ${searchField}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 w-full bg-vault-cardBg border border-vault-border rounded-r-full outline-none focus:border-vault-accent text-sm transition-all"
              />
            </div>
          </div>

          <button 
            onClick={cycleTheme}
            className="vault-btn flex items-center justify-center p-1.5 rounded-full h-8 w-8 relative group"
            title={`Skin ${currentSkin}/9`}
          >
            <Palette size={16} className="group-hover:rotate-12 transition-transform" />
          </button>

          <button className="vault-btn flex items-center justify-center p-1.5 rounded-full h-8 w-8 group">
            <Shield size={16} className="text-vault-accent group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* VIEWPORT */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* SIDEBAR */}
        <aside className={cn(
          "flex-none bg-vault-cardBg/30 border-r border-vault-border transition-all duration-300 overflow-y-auto z-10 flex flex-col gap-6",
          isSidebarOpen ? "w-64 p-4 opacity-100" : "w-0 p-0 opacity-0 border-r-0"
        )}>
          <div className="space-y-4 whitespace-nowrap overflow-hidden">
            {/* View Mode */}
            <div>
              <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2">
                <Shield size={14} className="text-vault-accent" /> View Mode
              </label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={viewSize} 
                onChange={(e) => setViewSize(parseInt(e.target.value))}
                className="w-full accent-vault-accent"
              />
              <div className="flex justify-between text-[10px] text-vault-muted mt-1 font-semibold">
                <span>Details</span>
                <span>Biggest</span>
              </div>
            </div>

            {/* Grouping */}
            <div>
              <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2">
                <Shield size={14} className="text-vault-accent" /> Group By
              </label>
              <select 
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="w-full bg-vault-bg border border-vault-border text-xs p-1.5 rounded outline-none focus:border-vault-accent text-vault-text"
              >
                <option value="None">None (Flat List)</option>
                <option value="Hostname">Source Hostname</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
               <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2">
                <Shield size={14} className="text-vault-accent" /> Sort Params
              </label>
              <div className="flex gap-2">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1 bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text"
                >
                  <option value="DateDesc">Newest (System)</option>
                  <option value="DateAsc">Oldest (System)</option>
                  <optgroup label="Metadata Fields">
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="domain">Domain</option>
                    <option value="views">Views</option>
                    <option value="likes">Likes</option>
                    <option value="dislikes">Dislikes</option>
                    <option value="quality">Quality</option>
                    <option value="resolution">Resolution</option>
                    <option value="size">Size</option>
                    <option value="timestamp">Date Saved</option>
                    <option value="datePublished">Date Published</option>
                  </optgroup>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="vault-btn p-1 px-2 text-[10px] font-bold"
                  title="Toggle Asc/Desc"
                >
                  {sortOrder === 'asc' ? 'ASC' : 'DESC'}
                </button>
              </div>
            </div>
            
            <hr className="border-vault-border opacity-50 my-2" />
            
            {/* PIN System */}
            <div className="pt-2">
              <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-3">
                <Lock size={14} className="text-vault-accent" /> PIN Protection
              </label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-vault-muted font-bold uppercase tracking-widest">Master PIN</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={pinSettings?.enabled || false} 
                      onChange={togglePin}
                    />
                    <div className="w-9 h-5 bg-vault-cardBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-vault-muted after:border-vault-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vault-accent peer-checked:after:bg-vault-bg" />
                  </label>
                </div>

                {pinSettings?.enabled && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <div>
                      <span className="text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60">Sequence Length</span>
                      <div className="flex gap-2">
                        {[4, 6].map(len => (
                          <button
                            key={len}
                            onClick={() => updatePinLength(len as 4 | 6)}
                            className={cn(
                              "flex-1 py-1 text-[10px] font-black rounded-sm border transition-all",
                              pinSettings.length === len 
                                ? "bg-vault-accent border-vault-accent text-vault-bg shadow-[0_0_10px_-2px_var(--color-vault-accent)]" 
                                : "bg-vault-bg border-vault-border text-vault-muted hover:border-vault-muted"
                            )}
                          >
                            {len} DIGITS
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60">Auto-Locker Delay</span>
                      <select 
                        value={pinSettings.lockTimeout}
                        onChange={(e) => updateLockTimeout(parseInt(e.target.value))}
                        className="w-full bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text font-bold"
                      >
                        <option value={600000}>10 Minutes</option>
                        <option value={1800000}>30 Minutes</option>
                        <option value={3600000}>1 Hour</option>
                        <option value={7200000}>2 Hours</option>
                        <option value={-1}>Never (Manual only)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        const next = { ...pinSettings, lastUnlocked: 1 }; // Force lock
                        savePinSettings(next);
                        setPinSettings(next);
                        setItems([]); 
                      }}
                      className="w-full py-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all rounded-sm"
                    >
                      Lock Vault Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-vault-border opacity-50 my-2" />
            
            {/* Sync Option */}
            <div className="pt-2">
              <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2">
                <Shield size={14} className="text-vault-accent" /> Persistence
              </label>
              <button
                onClick={() => setIsSyncing(!isSyncing)}
                className={cn(
                  "w-full vault-btn p-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-dashed",
                  isSyncing ? "border-vault-accent text-vault-accent bg-vault-accent/5" : "border-vault-border text-vault-muted opacity-60 hover:opacity-100"
                )}
                title={isFirefox ? "Use Firefox Sync Storage" : "Use Chrome Sync Storage"}
              >
                <div className={cn("w-1.5 h-1.5 rounded-full", isSyncing ? "bg-vault-accent animate-pulse" : "bg-vault-muted")} />
                {isSyncing ? "Sync Enabled" : "Enable Browser Sync"}
              </button>
              <p className="text-[9px] text-vault-muted mt-2 leading-relaxed opacity-60 italic">
                {isFirefox 
                  ? "Uses Firefox Sync to backup metadata across devices (excludes large binary previews)." 
                  : "Uses Chrome Sync (subject to 100KB limit per item, recommended for metadata only)."}
              </p>
            </div>

            <hr className="border-vault-border opacity-50 my-2" />
            
            <div className="text-xs text-vault-muted space-y-2">
              <p>Total Items: <strong className="text-vault-accent">{items.length}</strong></p>
              <p>Visible: <strong className="text-vault-text">{filtered.length}</strong></p>
            </div>
          </div>
        </aside>

        {/* MAIN ITEM WINDOW */}
        <main ref={mainRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 md:p-6 bg-vault-bg/50 scroll-smooth">
          <div className="max-w-[1920px] mx-auto space-y-10">
            
            {isolatedGroup && (
              <div className="mb-6">
                <button 
                  onClick={() => setIsolatedGroup(null)}
                  className="vault-btn flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back to Dashboard
                </button>
              </div>
            )}

            {groupsToRender.map(([groupName, groupItems]) => {
              const currentPage = pages[groupName] || 0;
              // If isolated, show all items using simple array, otherwise paginate
              const maxRows = 2;
              const perRow = viewClasses[viewSize as keyof typeof viewClasses].includes('grid-cols-4') ? 4 
                           : viewClasses[viewSize as keyof typeof viewClasses].includes('grid-cols-3') ? 3
                           : viewClasses[viewSize as keyof typeof viewClasses].includes('grid-cols-2') ? 2
                           : 1;
              const itemsPerPage = isolatedGroup ? groupItems.length : perRow * maxRows;
              
              const displayItems = isolatedGroup 
                ? groupItems 
                : groupItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
              
              const totalPages = Math.ceil(groupItems.length / itemsPerPage);

              return (
                <section key={groupName} className="space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <div 
                      className={cn("flex items-center gap-3", !isolatedGroup && "cursor-pointer group")}
                      onClick={() => !isolatedGroup && setIsolatedGroup(groupName)}
                    >
                      <h2 className="text-lg font-bold text-vault-text border-b-2 border-vault-accent pb-1 pr-4 inline-block transition-colors group-hover:text-vault-accent">
                        {groupName}
                      </h2>
                      <span className="text-xs bg-vault-cardBg border border-vault-border px-2 py-0.5 rounded-full text-vault-muted font-bold">
                        {groupItems.length}
                      </span>
                    </div>

                    {/* Pagination Controls (Only on non-isolated view and if multiple pages) */}
                    {!isolatedGroup && totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setGroupPage(groupName, -1)}
                          disabled={currentPage === 0}
                          className="vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span className="text-[10px] font-mono font-bold text-vault-muted w-10 text-center">
                          {currentPage + 1} / {totalPages}
                        </span>
                        <button 
                          onClick={() => setGroupPage(groupName, 1)}
                          disabled={currentPage >= totalPages - 1}
                          className="vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Section Grid */}
                  <div className={cn(
                    "grid gap-4 md:gap-6",
                    viewClasses[viewSize as keyof typeof viewClasses]
                  )}>
                    {displayItems.map((fav, idx) => (
                      <div key={`${fav.url}-${idx}`} className={cn(
                        "vault-card group relative flex transform transition-all hover:shadow-lg overflow-hidden",
                        viewSize === 1 ? "flex-row items-center gap-4 h-24 p-4 hover:-translate-y-1" : "flex-col h-[380px]"
                      )}>
                        
                        {/* THUMBNAIL AREA */}
                        {viewSize !== 1 && (
                          <div 
                            onClick={(e) => {
                              // If clicking an action button inside the thumb, don't trigger play
                              if ((e.target as HTMLElement).closest('.thumb-action')) return;
                              
                              if (fav.type === 'video' && fav.rawVideoSrc) {
                                setPlayingVideo(fav);
                                setVideoError(false);
                                setIsRefreshing(false);
                              } else {
                                window.open(fav.url, '_blank');
                              }
                            }}
                            className="relative w-full h-40 flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb border-b border-vault-border rounded-t-lg"
                          >
                            {fav.type === 'video' ? (
                              <PreviewThumb video={fav} />
                            ) : (
                              fav.thumbnail ? (
                                <img src={fav.thumbnail} alt={fav.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-vault-cardBg to-vault-bg text-vault-muted">
                                    <Shield size={32} className="opacity-20 mb-2" />
                                    <span className="text-[10px] font-mono opacity-50">NO PREVIEW</span>
                                </div>
                              )
                            )}

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" />

                            {/* Internal Thumbnail Actions */}
                            <div className="absolute top-2 left-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2">
                              <button className="thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Edit Metadata">
                                <Edit2 size={12} />
                              </button>
                            </div>
                            
                            <div className="absolute top-2 right-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2">
                              <button className="thumb-action p-1.5 bg-black/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Delete Item">
                                <Trash2 size={12} />
                              </button>
                            </div>

                            {/* Duration Badge */}
                            {fav.duration && (
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow z-20">
                                {typeof fav.duration === 'number' 
                                  ? `${Math.floor(fav.duration / 60)}:${(fav.duration % 60).toString().padStart(2, '0')}` 
                                  : fav.duration}
                              </div>
                            )}

                            {/* Hover Overlay / Play Preview */}
                            <div className="absolute inset-0 bg-vault-cardBg/10 group-hover/thumb:bg-vault-cardBg/30 transition-colors flex items-center justify-center z-10">
                              {fav.type === 'video' ? (
                                <div className="w-12 h-12 rounded-full bg-vault-accent/90 opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-2xl transform scale-75 group-hover/thumb:scale-100 duration-300">
                                  <Play fill="currentColor" className="text-vault-bg ml-1" size={20} />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-vault-cardBg opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-xl transform scale-75 group-hover/thumb:scale-100 duration-300 border border-vault-border">
                                  <ChevronRight className="text-vault-text" size={20} />
                                </div>
                              )}
                            </div>
                            
                            {/* Hover Status Info (Internal to Thumb) */}
                            <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover/thumb:opacity-100 transition-opacity pointer-events-none">
                              <div className="flex items-center gap-1.5 bg-black/80 px-2 py-1 rounded text-[10px] font-mono font-bold text-vault-accent border border-vault-accent/30 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-vault-accent animate-pulse" />
                                {fav.type === 'video' ? 'SCANNING' : 'LINK'}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* DETAILS AREA */}
                        <div className={cn("z-10 relative flex flex-col flex-1", viewSize === 1 ? "flex-row items-center justify-between w-full" : "p-4")}>
                          
                          <div className={cn("flex justify-between items-start mb-2", viewSize === 1 && "mb-0")}>
                            <div className="flex gap-2 items-center">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-vault-bg bg-vault-muted px-2 py-0.5 rounded-sm">
                                {viewSize > 1 ? `#${idx + 1 + (currentPage * itemsPerPage)}` : 'V-ID'}
                              </span>
                            </div>
                            {/* Removed redundant buttons from here in grid view, kept for detail list if needed but instruction asked for thumb corners */}
                          </div>
                          
                          <div className={cn("flex-1", viewSize === 1 ? "flex items-center justify-between w-full ml-4" : "flex flex-col")}>
                            <div className={viewSize === 1 ? "flex-1 mr-4" : ""}>
                              <h3 className={cn(
                                "font-bold mb-1 leading-snug cursor-pointer hover:text-vault-accent transition-colors",
                                viewSize === 1 ? "text-base line-clamp-1" : "text-[15px] line-clamp-2"
                              )}>
                                {fav.title || 'Untitled Reference'}
                              </h3>
                              <p className="text-xs text-vault-muted truncate max-w-[250px] font-mono opacity-80" title={fav.url}>
                                {fav.domain || new URL(fav.url).hostname.replace('www.', '')}
                              </p>
                            </div>
                            
                            {viewSize > 1 && (
                              <div className="mt-3 space-y-1 mb-2 flex-1">
                                {fav.author && (
                                  <p className="text-[11px] text-vault-text line-clamp-1"><span className="text-vault-muted">By:</span> {fav.author}</p>
                                )}
                                {(fav.views || fav.likes) && (
                                  <p className="text-[11px] text-vault-muted flex gap-3 mt-1">
                                    {fav.views && <span><strong>{fav.views}</strong> views</span>}
                                    {fav.likes && <span><strong>{fav.likes}</strong> likes</span>}
                                  </p>
                                )}
                                {fav.tags && fav.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {fav.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-[9px] bg-vault-cardBg border border-vault-border px-1.5 py-0.5 rounded text-vault-muted inline-block">
                                        {tag}
                                      </span>
                                    ))}
                                    {fav.tags.length > 3 && (
                                      <span className="text-[9px] bg-vault-cardBg/50 border border-vault-border border-dashed px-1.5 py-0.5 rounded text-vault-muted inline-block">
                                        +{fav.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className={cn(
                            "flex items-center justify-between border-vault-border pt-3 mt-auto",
                            viewSize === 1 ? "border-none ml-4 gap-4 mt-0 pt-0" : "border-t"
                          )}>
                            <span className="text-[11px] font-semibold text-vault-muted tracking-wider">
                              {new Date(fav.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                            </span>
                            <a 
                              href={fav.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] font-bold text-vault-bg bg-vault-accent hover:bg-vault-accentHover transition-colors flex items-center gap-1 px-3 py-1.5 rounded-sm"
                            >
                              OPEN <ChevronRight size={12} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-24 text-center border border-dashed border-vault-border rounded-xl bg-vault-cardBg/30 flex flex-col items-center justify-center">
                <Shield size={48} className="text-vault-border mb-4" />
                <p className="text-vault-muted text-sm font-semibold tracking-widest uppercase mb-2">
                  No encrypted items found
                </p>
                <p className="text-xs text-vault-muted opacity-60">
                   Try scanning a new target domain or clearing your filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* VIDEO PLAYER MODAL */}
      {playingVideo && (
        <div 
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-all duration-700",
            isDimmed ? "bg-black/98" : "bg-black/80 backdrop-blur-sm"
          )}
          onClick={() => { setPlayingVideo(null); setIsDimmed(false); }}
        >
          <div 
            className={cn(
              "w-[90vw] max-w-5xl bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl flex flex-col overflow-hidden transition-transform duration-500",
              playingVideo ? "scale-100 opacity-100" : "scale-95 opacity-0"
            )}
            onClick={e => e.stopPropagation()} // Prevent close on click inside
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-vault-border bg-vault-bg/50">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsDimmed(!isDimmed)}
                  className={cn(
                    "vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full transition-all border border-vault-border/50",
                    isDimmed ? "bg-vault-accent text-vault-bg" : "bg-vault-cardBg text-vault-muted hover:text-vault-accent"
                  )}
                  title={isDimmed ? "Turn Lights ON" : "Turn Lights OFF"}
                >
                  <Palette size={16} fill={isDimmed ? "currentColor" : "none"} />
                </button>
                <h3 className="font-bold text-lg text-vault-text line-clamp-1 pr-4">
                  {playingVideo.title || 'Untitled Video'}
                </h3>
              </div>
              <button 
                title="Close Player"
                onClick={() => { setPlayingVideo(null); setIsDimmed(false); }}
                className="vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors border-none"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body / Player */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center group/player">
              {playingVideo.type === 'video' && playingVideo.rawVideoSrc && !videoError ? (
                <div className="w-full h-full relative">
                  <video 
                    src={playingVideo.rawVideoSrc}
                    autoPlay
                    controls
                    preload="auto"
                    className="w-full h-full object-contain"
                    playsInline
                    onError={() => setVideoError(true)}
                  />
                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none transition-opacity group-hover/player:opacity-100 opacity-20 group-hover/player:delay-100">
                    <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-sm border border-vault-accent/30 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-vault-accent animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-vault-accent uppercase tracking-widest">
                        Vault Stream: {playingVideo.quality || playingVideo.resolution || 'AUTO'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : videoError ? (
                <div className="text-center space-y-4 p-6">
                  <AlertTriangle className="mx-auto text-yellow-500" size={48} />
                  <div>
                    <h4 className="text-vault-text font-bold text-lg mb-1">Playback Failed</h4>
                    <p className="text-vault-muted text-sm">The media link may have expired or is blocked by CORS.</p>
                  </div>
                  <div className="flex justify-center gap-3 mt-4">
                    <button 
                      className="vault-btn text-sm px-4 py-2 flex items-center gap-2"
                      onClick={async () => {
                        if (!playingVideo) return;
                        setIsRefreshing(true);
                        setVideoError(false);
                        try {
                          const response = (await browser.runtime.sendMessage({
                            action: "extract_fresh_m3u8",
                            url: playingVideo.url
                          })) as { src: string | null };
                          
                          if (response && response.src) {
                            // Update the video in local state
                            const updated = { ...playingVideo, rawVideoSrc: response.src };
                            setPlayingVideo(updated);
                            
                            // Update in permanent storage
                            const all = await getSavedVideos();
                            const idx = all.findIndex(v => v.url === playingVideo.url);
                            if (idx !== -1) {
                              all[idx].rawVideoSrc = response.src;
                              await saveVideos(all);
                              setItems(all);
                            }
                          } else {
                            setVideoError(true);
                          }
                        } catch (err) {
                          console.error("Refresh failed:", err);
                          setVideoError(true);
                        } finally {
                          setIsRefreshing(false);
                        }
                      }}
                      disabled={isRefreshing}
                    >
                      {isRefreshing ? 'Refreshing Link...' : 'Try Refreshing Link'}
                    </button>
                    <a 
                      href={playingVideo.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="vault-btn text-sm px-4 py-2 bg-vault-accent text-vault-bg flex items-center gap-2 hover:bg-vault-accentHover"
                    >
                      Open Original Page
                    </a>
                  </div>
                </div>
              ) : (
                <video 
                  src={playingVideo.rawVideoSrc || undefined} 
                  controls 
                  autoPlay
                  className="w-full h-full outline-none"
                  onError={() => setVideoError(true)}
                >
                  <source src={playingVideo.rawVideoSrc || undefined} />
                </video>
              )}
            </div>
            
            {/* Modal Footer / Metadata */}
            <div className="p-4 bg-vault-cardBg flex items-center justify-between text-sm text-vault-muted">
              <div>
                <span className="font-semibold text-vault-text">{playingVideo.domain || new URL(playingVideo.url).hostname}</span>
                {playingVideo.author && <span className="ml-2 px-2 border-l border-vault-border">By: {playingVideo.author}</span>}
              </div>
              <div className="font-mono text-xs">
                {new Date(playingVideo.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};