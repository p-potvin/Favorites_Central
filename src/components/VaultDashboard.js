import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import browser from 'webextension-polyfill';
import { getPinSettings, getSavedVideos, savePinSettings, saveVideos } from '../lib/storage-vault';
import { getPreview } from '../lib/dexie-store';
import { VAULT_THEMES, getThemeClass } from '../lib/themes'; // Added for binary previews
import { Search, Shield, Settings, Palette, ChevronRight, ChevronLeft, ArrowLeft, Trash2, Edit2, Play, X, AlertTriangle, RefreshCw, Lock, Download, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState, useMemo, useRef } from 'react';
/**
 * Preview Player Component
 * Handles the "YouTube-style" 10x2s hover preview
 */
const PreviewThumb = ({ video }) => {
    const [previewBlob, setPreviewBlob] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const videoRef = useRef(null);
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
        if (previewBlob)
            return;
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
            }
            catch (e) {
                console.error("[VaultAuth] Manual retrigger failed:", e);
            }
            finally {
                setIsProcessing(false);
            }
        }
    };
    return (_jsxs("div", { className: "absolute inset-0 z-20 overflow-hidden bg-black", onMouseEnter: handleMouseEnter, onMouseLeave: () => setIsHovering(false), children: [isHovering && previewBlob ? (_jsx("video", { ref: videoRef, src: previewBlob, className: "w-full h-full object-cover", autoPlay: true, muted: true, loop: true, playsInline: true })) : (_jsx("img", { src: video.thumbnail, alt: video.title, className: cn("w-full h-full object-cover transition-opacity duration-300", isHovering ? "opacity-0" : "opacity-100") })), isProcessing ? (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm", children: _jsx(RefreshCw, { className: "text-vault-accent animate-spin", size: 20 }) })) : (!previewBlob && isHovering && (_jsx("div", { className: "absolute bottom-2 left-2 bg-black/60 text-[8px] text-white px-1 rounded uppercase tracking-tighter", children: "Processing..." })))] }));
};
export const VaultDashboard = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState('title');
    const [currentTheme, setCurrentTheme] = useState(3);
    // Sidebar states
    const [isSidebarOpen, setSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('vault-sidebar-open');
        return saved !== 'false';
    });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    // Custom Dialog States
    const [toastMessage, setToastMessage] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);
    const handleExportVault = async () => {
        try {
            const data = await getSavedVideos();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `vault-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
        catch (err) {
            console.error("Export failed", err);
        }
    };
    const handleImportVault = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result);
                if (Array.isArray(json)) {
                    await saveVideos(json);
                    setItems(json);
                    setToastMessage({ msg: "Backup successfully imported!", type: "success" });
                }
            }
            catch (err) {
                console.error("Import failed", err);
                setToastMessage({ msg: "Failed to import. Invalid JSON backup.", type: "error" });
            }
        };
        reader.readAsText(file);
    };
    const handleDelete = async (url) => {
        setConfirmDialog({
            message: "Are you sure you want to delete this item?",
            onConfirm: async () => {
                const all = await getSavedVideos();
                const next = all.filter(v => v.url !== url);
                await saveVideos(next);
                setItems(next);
                setConfirmDialog(null);
            }
        });
    };
    const handleEdit = (video) => {
        setEditingItem({ current: JSON.parse(JSON.stringify(video)), original: video });
    };
    const saveEditedItem = async (updatedVideo, originalVideo) => {
        const all = await getSavedVideos();
        const idx = all.findIndex(v => v.url === originalVideo.url);
        if (idx !== -1) {
            all[idx] = updatedVideo;
            await saveVideos(all);
            setItems(all);
            // If URL or rawVideoSrc was changed, trigger a rescan
            if ((updatedVideo.url !== originalVideo.url || updatedVideo.rawVideoSrc !== originalVideo.rawVideoSrc) && updatedVideo.type === 'video') {
                browser.runtime.sendMessage({
                    action: "generate_preview",
                    data: {
                        url: updatedVideo.rawVideoSrc || updatedVideo.url,
                        duration: typeof updatedVideo.duration === 'number' ? updatedVideo.duration : 60
                    }
                });
            }
        }
        setEditingItem(null);
    };
    const handleWipeVault = async () => {
        setConfirmDialog({
            message: "Are you sure you want to completely wipe your vault? This cannot be undone.",
            onConfirm: async () => {
                await saveVideos([]);
                setItems([]);
                setIsSettingsOpen(false);
                setConfirmDialog(null);
            }
        });
    };
    const [groupBy, setGroupBy] = useState(() => localStorage.getItem('vault-group-by') || 'Hostname');
    const [sortBy, setSortBy] = useState(() => localStorage.getItem('vault-sort-by') || 'DateDesc');
    const [sortOrder, setSortOrder] = useState(() => localStorage.getItem('vault-sort-order') || 'desc');
    const [viewSize, setViewSize] = useState(() => {
        const saved = localStorage.getItem('vault-view-size');
        return saved ? parseInt(saved, 10) : 3;
    }); // 1: Details, 2: list, 3: Small, 4: Medium, 5: Large, 6: Biggest
    useEffect(() => {
        localStorage.setItem('vault-group-by', groupBy);
    }, [groupBy]);
    useEffect(() => {
        localStorage.setItem('vault-sort-by', sortBy);
    }, [sortBy]);
    useEffect(() => {
        localStorage.setItem('vault-sort-order', sortOrder);
    }, [sortOrder]);
    useEffect(() => {
        localStorage.setItem('vault-view-size', viewSize.toString());
    }, [viewSize]);
    const [isDimmed, setIsDimmed] = useState(false); // Player Dimmer State
    // Layout & Pagination states
    const [isolatedGroup, setIsolatedGroup] = useState(null);
    const [pages, setPages] = useState({});
    const [sectionLimit, setSectionLimit] = useState(50);
    const mainRef = useRef(null);
    // Video Player Modal states
    const [playingVideo, setPlayingVideo] = useState(null);
    const [videoError, setVideoError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // PIN Settings
    const [pinSettings, setPinSettings] = useState(null);
    // Browser Sync State
    const [isSyncing, setIsSyncing] = useState(() => {
        const saved = localStorage.getItem('vault-sync-enabled');
        return saved === 'true';
    });
    const [isFirefox] = useState(() => navigator.userAgent.toLowerCase().includes('firefox'));
    useEffect(() => {
        localStorage.setItem('vault-sync-enabled', isSyncing.toString());
    }, [isSyncing]);
    useEffect(() => {
        const savedTheme = localStorage.getItem('vault-theme');
        if (savedTheme) {
            const themeNum = parseInt(savedTheme, 10);
            setCurrentTheme(themeNum);
            const mode = VAULT_THEMES[themeNum]?.mode || 'dark';
            document.documentElement.setAttribute('data-theme', getThemeClass(themeNum));
            document.documentElement.classList.toggle('dark', mode === 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', getThemeClass(3));
            document.documentElement.classList.add('dark');
        }
        const savedSidebar = localStorage.getItem('vault-sidebar-open');
        if (savedSidebar !== null) {
            setSidebarOpen(savedSidebar === 'true');
        }
        const savedViewSize = localStorage.getItem('vault-view-size');
        if (savedViewSize)
            setViewSize(parseInt(savedViewSize, 10));
        const savedGroupBy = localStorage.getItem('vault-group-by');
        if (savedGroupBy)
            setGroupBy(savedGroupBy);
        const savedSortBy = localStorage.getItem('vault-sort-by');
        if (savedSortBy)
            setSortBy(savedSortBy);
        const savedSortOrder = localStorage.getItem('vault-sort-order');
        if (savedSortOrder)
            setSortOrder(savedSortOrder);
        const load = async () => {
            const settings = await getPinSettings();
            setPinSettings(settings);
            const all = await getSavedVideos();
            setItems(all || []);
        };
        load();
        // Listen for browser sync updates
        const handleStorageChange = (changes, areaName) => {
            if (areaName === 'local' && changes.vault_videos) {
                setItems(changes.vault_videos.newValue || []);
            }
        };
        if (browser.storage && browser.storage.onChanged) {
            browser.storage.onChanged.addListener(handleStorageChange);
        }
        return () => {
            if (browser.storage && browser.storage.onChanged) {
                browser.storage.onChanged.removeListener(handleStorageChange);
            }
        };
    }, []);
    const togglePin = async (e) => {
        const enabled = e.target.checked;
        if (enabled) {
            setPromptDialog({
                message: "Enter a new 4 or 6 digit PIN:",
                type: "password",
                onConfirm: async (newPin) => {
                    if (newPin && (newPin.length === 4 || newPin.length === 6) && /^\d+$/.test(newPin)) {
                        const updated = { ...pinSettings, enabled: true, pin: newPin, lastUnlocked: Date.now() };
                        await savePinSettings(updated);
                        setPinSettings(updated);
                    }
                    else {
                        setToastMessage({ msg: "Invalid PIN. It must be 4 or 6 digits.", type: "error" });
                    }
                    setPromptDialog(null);
                }
            });
            // Temporarily revert UI checkbox until confirmed
            e.target.checked = false;
        }
        else {
            const updated = { ...pinSettings, enabled: false };
            await savePinSettings(updated);
            setPinSettings(updated);
        }
    };
    const updatePinLength = async (len) => {
        const updated = { ...pinSettings, length: len };
        await savePinSettings(updated);
        setPinSettings(updated);
    };
    const updateLockTimeout = async (timeout) => {
        const updated = { ...pinSettings, lockTimeout: timeout };
        await savePinSettings(updated);
        setPinSettings(updated);
    };
    const changeTheme = (id) => {
        setCurrentTheme(id);
        const mode = VAULT_THEMES[id]?.mode || 'dark';
        document.documentElement.setAttribute('data-theme', getThemeClass(id));
        document.documentElement.classList.toggle('dark', mode === 'dark');
        localStorage.setItem('vault-theme', id.toString());
    };
    const cycleTheme = () => {
        const nextTheme = currentTheme === 9 ? 1 : currentTheme + 1;
        setCurrentTheme(nextTheme);
        const mode = VAULT_THEMES[nextTheme]?.mode || 'dark';
        document.documentElement.setAttribute('data-theme', getThemeClass(nextTheme));
        document.documentElement.classList.toggle('dark', mode === 'dark');
        localStorage.setItem('vault-theme', nextTheme.toString());
    };
    // Infinite scroll
    const handleScroll = () => {
        if (!mainRef.current || isolatedGroup)
            return;
        const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
            setSectionLimit(prev => prev + 20); // soft load 20 more
        }
    };
    const filtered = useMemo(() => {
        return items.filter(f => {
            if (!search)
                return true;
            const targetValue = f[searchField];
            if (targetValue === null || targetValue === undefined)
                return false;
            const searchStr = search.toLowerCase();
            if (Array.isArray(targetValue)) {
                return targetValue.some(v => v.toString().toLowerCase().includes(searchStr));
            }
            return targetValue.toString().toLowerCase().includes(searchStr);
        });
    }, [items, search, searchField]);
    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            if (sortBy === 'DateDesc')
                return b.timestamp - a.timestamp;
            if (sortBy === 'DateAsc')
                return a.timestamp - b.timestamp;
            const valA = a[sortBy];
            const valB = b[sortBy];
            if (valA === undefined || valA === null)
                return 1;
            if (valB === undefined || valB === null)
                return -1;
            let comparison = 0;
            if (typeof valA === 'number' && typeof valB === 'number') {
                comparison = valA - valB;
            }
            else {
                comparison = valA.toString().localeCompare(valB.toString());
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [filtered, sortBy, sortOrder]);
    const grouped = useMemo(() => {
        if (groupBy === 'None')
            return { 'All Items': sorted };
        return sorted.reduce((acc, item) => {
            let key = 'Unknown';
            try {
                const urlObj = new URL(item.url);
                key = urlObj.hostname.replace(/^www\./, '');
            }
            catch (e) { }
            if (!acc[key])
                acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }, [sorted, groupBy]);
    const viewClasses = {
        1: 'flex flex-col gap-[1px] w-full', // Details (compact list)
        2: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2', // List mode
        3: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', // Small
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', // Medium
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', // Large
        6: 'grid-cols-1 xl:grid-cols-2', // Biggest
    };
    const itemsPerPageParams = {
        1: 50, // Compact Details
        2: 10, // List
        3: 12, // Small
        4: 8, // Medium
        5: 6, // Large
        6: 4 // Biggest
    };
    const maxItemsPerRow = itemsPerPageParams[viewSize];
    // If isolated, display that group. Else display UP TO `sectionLimit` groups.
    const groupsToRender = isolatedGroup
        ? [[isolatedGroup, grouped[isolatedGroup] || []]]
        : Object.entries(grouped).slice(0, sectionLimit);
    // Helper to change page for a group
    const setGroupPage = (groupName, delta) => {
        setPages(prev => ({
            ...prev,
            [groupName]: Math.max(0, (prev[groupName] || 0) + delta)
        }));
    };
    return (_jsxs("div", { className: "flex flex-col h-screen overflow-hidden bg-vault-bg text-vault-text font-sans antialiased transition-colors duration-500", children: [_jsxs("header", { style: { backgroundColor: 'var(--vault-card-bg)' }, className: "flex-none h-16 flex items-center justify-between px-4 md:px-6 z-20 backdrop-blur-md border-b border-vault-border shadow-sm relative", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-vault-accent", children: _jsx(Shield, { size: 24, strokeWidth: 2.5 }) }), _jsxs("div", { className: "leading-tight", children: [_jsxs("h1", { className: "text-xl font-bold tracking-tight flex items-center gap-1", children: ["Vault", _jsx("span", { className: "text-vault-accent font-light", children: "Central" })] }), _jsxs("p", { className: "text-[9px] text-vault-muted font-medium tracking-wider uppercase", children: ["Secure Media Vault // ", _jsx("a", { href: "https://vaultwares.com", target: "_blank", rel: "noreferrer", className: "hover:text-vault-accent underline transition-colors", children: "VaultWares.com" })] })] })] }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative group flex items-center", children: [_jsxs("select", { value: searchField, onChange: (e) => setSearchField(e.target.value), className: "bg-vault-cardBg border border-vault-border border-r-0 rounded-l-full px-4 py-2 text-sm text-vault-text focus:border-vault-accent focus:z-10 outline-none appearance-none cursor-pointer", children: [_jsx("option", { value: "title", children: "Title" }), _jsx("option", { value: "author", children: "Author" }), _jsx("option", { value: "domain", children: "Domain" }), _jsx("option", { value: "url", children: "URL" }), _jsx("option", { value: "quality", children: "Quality" }), _jsx("option", { value: "resolution", children: "Res" }), _jsx("option", { value: "description", children: "Desc" }), _jsx("option", { value: "tags", children: "Tags" })] }), _jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-vault-muted group-focus-within:text-vault-accent transition-colors", size: 16 }), _jsx("input", { type: "text", placeholder: `Search in ${searchField}...`, value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 pr-4 py-2 w-64 bg-vault-cardBg border border-vault-border rounded-r-full outline-none focus:border-vault-accent focus:z-10 text-sm transition-all" })] })] }), _jsx("button", { onClick: () => setIsSettingsOpen(true), className: "vault-btn flex items-center justify-center p-1.5 rounded-full h-8 w-8 group", title: "Advanced Options & Export", children: _jsx(Settings, { size: 16, className: "text-vault-accent group-hover:rotate-90 transition-transform duration-300" }) })] })] }), _jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [_jsxs("div", { className: "flex flex-none relative z-20", children: [_jsx("aside", { className: cn("bg-vault-cardBg/30 border-r border-vault-border transition-all duration-300 overflow-y-auto h-full flex flex-col gap-6", isSidebarOpen ? "w-64 p-4 opacity-100 visible" : "w-0 p-0 opacity-0 invisible border-none"), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2", children: [_jsx(Shield, { size: 14, className: "text-vault-accent" }), " View Mode"] }), _jsx("input", { type: "range", min: "1", max: "6", value: viewSize, onChange: (e) => setViewSize(parseInt(e.target.value)), className: "w-full accent-vault-accent" }), _jsxs("div", { className: "flex justify-between text-[10px] text-vault-muted mt-1 font-semibold", children: [_jsx("span", { children: "Details" }), _jsx("span", { children: "Biggest" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2", children: [_jsx(Palette, { size: 14, className: "text-vault-accent" }), " UI Theme"] }), _jsx("select", { value: currentTheme, onChange: (e) => changeTheme(parseInt(e.target.value)), className: "w-full bg-vault-bg border border-vault-border text-xs p-1.5 rounded outline-none focus:border-vault-accent text-vault-text", children: Object.values(VAULT_THEMES).map(t => (_jsxs("option", { value: t.id, children: [t.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), " (", t.mode, ")"] }, t.id))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2", children: [_jsx(Shield, { size: 14, className: "text-vault-accent" }), " Group By"] }), _jsxs("select", { value: groupBy, onChange: (e) => setGroupBy(e.target.value), className: "w-full bg-vault-bg border border-vault-border text-xs p-1.5 rounded outline-none focus:border-vault-accent text-vault-text", children: [_jsx("option", { value: "None", children: "None (Flat List)" }), _jsx("option", { value: "Hostname", children: "Source Hostname" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2", children: [_jsx(Shield, { size: 14, className: "text-vault-accent" }), " Sort Params"] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "flex-1 bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text", children: [_jsx("option", { value: "DateDesc", children: "Newest (System)" }), _jsx("option", { value: "DateAsc", children: "Oldest (System)" }), _jsxs("optgroup", { label: "Metadata Fields", children: [_jsx("option", { value: "title", children: "Title" }), _jsx("option", { value: "author", children: "Author" }), _jsx("option", { value: "domain", children: "Domain" }), _jsx("option", { value: "views", children: "Views" }), _jsx("option", { value: "likes", children: "Likes" }), _jsx("option", { value: "dislikes", children: "Dislikes" }), _jsx("option", { value: "quality", children: "Quality" }), _jsx("option", { value: "resolution", children: "Resolution" }), _jsx("option", { value: "size", children: "Size" }), _jsx("option", { value: "timestamp", children: "Date Saved" }), _jsx("option", { value: "datePublished", children: "Date Published" })] })] }), _jsx("button", { onClick: () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'), className: "vault-btn p-1 px-2 text-[10px] font-bold", title: "Toggle Asc/Desc", children: sortOrder === 'asc' ? 'ASC' : 'DESC' })] })] }), _jsx("hr", { className: "border-vault-border opacity-50 my-2" }), _jsxs("div", { className: "pt-2", children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-3", children: [_jsx(Lock, { size: 14, className: "text-vault-accent" }), " PIN Protection"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[10px] text-vault-muted font-bold uppercase tracking-widest", children: "Master PIN" }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: pinSettings?.enabled || false, onChange: togglePin }), _jsx("div", { className: "w-9 h-5 bg-vault-cardBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-vault-muted after:border-vault-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vault-accent peer-checked:after:bg-vault-bg" })] })] }), pinSettings?.enabled && (_jsxs("div", { className: "space-y-3 animate-in slide-in-from-top-2 duration-300", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60", children: "Sequence Length" }), _jsx("div", { className: "flex gap-2", children: [4, 6].map(len => (_jsxs("button", { onClick: () => updatePinLength(len), className: cn("flex-1 py-1 text-[10px] font-black rounded-sm border transition-all", pinSettings.length === len
                                                                                    ? "bg-vault-accent border-vault-accent text-vault-bg shadow-[0_0_10px_-2px_var(--color-vault-accent)]"
                                                                                    : "bg-vault-bg border-vault-border text-vault-muted hover:border-vault-muted"), children: [len, " DIGITS"] }, len))) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60", children: "Auto-Locker Delay" }), _jsxs("select", { value: pinSettings.lockTimeout, onChange: (e) => updateLockTimeout(parseInt(e.target.value)), className: "w-full bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text font-bold", children: [_jsx("option", { value: 600000, children: "10 Minutes" }), _jsx("option", { value: 1800000, children: "30 Minutes" }), _jsx("option", { value: 3600000, children: "1 Hour" }), _jsx("option", { value: 7200000, children: "2 Hours" }), _jsx("option", { value: -1, children: "Never (Manual only)" })] })] }), _jsx("button", { onClick: () => {
                                                                        const next = { ...pinSettings, lastUnlocked: 1 }; // Force lock
                                                                        savePinSettings(next);
                                                                        setPinSettings(next);
                                                                        setItems([]);
                                                                    }, className: "w-full py-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all rounded-sm", children: "Lock Vault Now" })] }))] })] }), _jsx("hr", { className: "border-vault-border opacity-50 my-2" }), _jsxs("div", { className: "pt-2", children: [_jsxs("label", { className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2", children: [_jsx(Shield, { size: 14, className: "text-vault-accent" }), " Persistence"] }), _jsxs("button", { onClick: () => setIsSyncing(!isSyncing), className: cn("w-full vault-btn p-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-dashed", isSyncing ? "border-vault-accent text-vault-accent bg-vault-accent/5" : "border-vault-border text-vault-muted opacity-60 hover:opacity-100"), title: isFirefox ? "Use Firefox Sync Storage" : "Use Chrome Sync Storage", children: [_jsx("div", { className: cn("w-1.5 h-1.5 rounded-full", isSyncing ? "bg-vault-accent animate-pulse" : "bg-vault-muted") }), isSyncing ? "Sync Enabled" : "Enable Browser Sync"] }), _jsx("p", { className: "text-[9px] text-vault-muted mt-2 leading-relaxed opacity-60 italic", children: isFirefox
                                                        ? "Uses Firefox Sync to backup metadata across devices (excludes large binary previews)."
                                                        : "Uses Chrome Sync (subject to 100KB limit per item, recommended for metadata only)." })] }), _jsx("hr", { className: "border-vault-border opacity-50 my-2" }), _jsxs("div", { className: "text-xs text-vault-muted space-y-2", children: [_jsxs("p", { children: ["Total Items: ", _jsx("strong", { className: "text-vault-accent", children: items.length })] }), _jsxs("p", { children: ["Visible: ", _jsx("strong", { className: "text-vault-text", children: filtered.length })] })] })] }) }), _jsx("div", { onClick: () => {
                                    const newState = !isSidebarOpen;
                                    setSidebarOpen(newState);
                                    localStorage.setItem('vault-sidebar-open', newState.toString());
                                }, className: "w-4 bg-vault-cardBg/50 hover:bg-vault-cardBg border-r border-vault-border flex flex-col items-center justify-center cursor-pointer transition-colors group z-30", title: isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar", children: _jsx("div", { className: "w-1 h-8 rounded-full bg-vault-border group-hover:bg-vault-accent transition-colors" }) })] }), _jsx("main", { ref: mainRef, onScroll: handleScroll, className: "flex-1 overflow-y-auto p-4 md:p-6 bg-vault-bg/50 scroll-smooth", children: _jsxs("div", { className: "max-w-[1920px] mx-auto space-y-10", children: [isolatedGroup && (_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => setIsolatedGroup(null), className: "vault-btn flex items-center gap-2", children: [_jsx(ArrowLeft, { size: 16 }), " Back to Dashboard"] }) })), groupsToRender.map(([groupName, groupItems]) => {
                                    const currentPage = pages[groupName] || 0;
                                    // If isolated, show all items using simple array, otherwise paginate
                                    const maxRows = 2;
                                    const perRow = viewClasses[viewSize].includes('grid-cols-4') ? 4
                                        : viewClasses[viewSize].includes('grid-cols-3') ? 3
                                            : viewClasses[viewSize].includes('grid-cols-2') ? 2
                                                : 1;
                                    const itemsPerPage = isolatedGroup ? groupItems.length : perRow * maxRows;
                                    const displayItems = isolatedGroup
                                        ? groupItems
                                        : groupItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
                                    const totalPages = Math.ceil(groupItems.length / itemsPerPage);
                                    return (_jsxs("section", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: cn("flex items-center gap-3", !isolatedGroup && "cursor-pointer group"), onClick: () => !isolatedGroup && setIsolatedGroup(groupName), children: [_jsx("h2", { className: "text-lg font-bold text-vault-text border-b-2 border-vault-accent pb-1 pr-4 inline-block transition-colors group-hover:text-vault-accent", children: groupName }), _jsx("span", { className: "text-xs bg-vault-cardBg border border-vault-border px-2 py-0.5 rounded-full text-vault-muted font-bold", children: groupItems.length })] }), !isolatedGroup && totalPages > 1 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setGroupPage(groupName, -1), disabled: currentPage === 0, className: "vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30", children: _jsx(ChevronLeft, { size: 14 }) }), _jsxs("span", { className: "text-[10px] font-mono font-bold text-vault-muted w-10 text-center", children: [currentPage + 1, " / ", totalPages] }), _jsx("button", { onClick: () => setGroupPage(groupName, 1), disabled: currentPage >= totalPages - 1, className: "vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30", children: _jsx(ChevronRight, { size: 14 }) })] }))] }), _jsx("div", { className: cn("grid gap-4 md:gap-6", viewClasses[viewSize]), children: displayItems.map((fav, idx) => (_jsxs("div", { className: cn("vault-card group relative flex transform transition-all hover:shadow-lg overflow-hidden", viewSize === 1
                                                        ? "flex-row items-center gap-2 h-10 px-3 py-1 border-b border-vault-border rounded-none shadow-none hover:bg-vault-cardBg/50"
                                                        : viewSize === 2
                                                            ? "flex-row items-stretch gap-4 h-[110px] p-0 hover:-translate-y-1"
                                                            : "flex-col h-[280px]"), children: [viewSize >= 2 && (_jsxs("div", { onClick: (e) => {
                                                                // If clicking an action button inside the thumb, don't trigger play
                                                                if (e.target.closest('.thumb-action'))
                                                                    return;
                                                                if (fav.type === 'video' && fav.rawVideoSrc) {
                                                                    setPlayingVideo(fav);
                                                                    setVideoError(false);
                                                                    setIsRefreshing(false);
                                                                }
                                                                else {
                                                                    window.open(fav.url, '_blank');
                                                                }
                                                            }, className: viewSize === 2 ? "relative w-2/5 flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb rounded-l-lg border-r border-vault-border" : "relative w-full h-[180px] flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb border-b border-vault-border rounded-t-lg", children: [fav.type === 'video' ? (_jsx(PreviewThumb, { video: fav })) : (fav.thumbnail ? (_jsx("img", { src: fav.thumbnail, alt: fav.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" })) : (_jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-vault-cardBg to-vault-bg/50", children: [_jsx(Shield, { size: 32, className: "opacity-10 mb-1" }), _jsx("span", { className: "text-[10px] font-mono opacity-30", children: "NO PREVIEW" })] }))), _jsx("div", { className: "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }), _jsx("div", { className: "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }), _jsx("div", { className: "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }), _jsx("div", { className: "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }), viewSize > 2 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute top-2 left-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2", children: _jsx("button", { onClick: (e) => { e.stopPropagation(); handleEdit(fav); }, className: "thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110", title: "Edit Metadata", children: _jsx(Edit2, { size: 12 }) }) }), _jsx("div", { className: "absolute top-2 right-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2", children: _jsx("button", { onClick: (e) => { e.stopPropagation(); handleDelete(fav.url); }, className: "thumb-action p-1.5 bg-black/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110", title: "Delete Item", children: _jsx(Trash2, { size: 12 }) }) })] })), fav.duration && (_jsx("div", { className: "absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow z-20", children: typeof fav.duration === 'number'
                                                                        ? `${Math.floor(fav.duration / 60)}:${(fav.duration % 60).toString().padStart(2, '0')}`
                                                                        : fav.duration })), _jsx("div", { className: "absolute inset-0 bg-vault-cardBg/10 group-hover/thumb:bg-vault-cardBg/30 transition-colors flex items-center justify-center z-10", children: fav.type === 'video' ? (_jsx("div", { className: "w-12 h-12 rounded-full bg-vault-accent/90 opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-2xl transform scale-75 group-hover/thumb:scale-100 duration-300", children: _jsx(Play, { fill: "currentColor", className: "text-vault-bg ml-1", size: 20 }) })) : (_jsx("div", { className: "w-12 h-12 rounded-full bg-vault-cardBg opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-xl transform scale-75 group-hover/thumb:scale-100 duration-300 border border-vault-border", children: _jsx(ChevronRight, { className: "text-vault-text", size: 20 }) })) }), _jsx("div", { className: "absolute bottom-2 left-2 z-20 opacity-0 group-hover/thumb:opacity-100 transition-opacity pointer-events-none", children: _jsxs("div", { className: "flex items-center gap-1.5 bg-black/80 px-2 py-1 rounded text-[10px] font-mono font-bold text-vault-accent border border-vault-accent/30 backdrop-blur-sm", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-vault-accent animate-pulse" }), fav.type === 'video' ? 'SCANNING' : 'LINK'] }) })] })), _jsxs("div", { className: cn("z-10 relative flex flex-col flex-1", viewSize === 1 ? "flex-row items-center justify-between w-full" : "p-4"), children: [_jsxs("div", { className: cn("flex justify-between items-start mb-2", viewSize === 1 && "mb-0"), children: [_jsx("div", { className: "flex gap-2 items-center", children: _jsx("span", { className: "text-[10px] uppercase font-bold tracking-widest text-vault-bg bg-vault-muted px-2 py-0.5 rounded-sm", children: viewSize > 1 ? `#${idx + 1 + (currentPage * itemsPerPage)}` : 'V-ID' }) }), viewSize <= 2 && (_jsxs("div", { className: "flex gap-1 ml-auto", children: [_jsx("button", { onClick: (e) => { e.stopPropagation(); handleEdit(fav); }, className: "vault-btn p-1 flex items-center justify-center border-none hover:bg-vault-cardBg", title: "Edit", children: _jsx(Edit2, { size: 14, className: "text-vault-muted hover:text-vault-accent" }) }), _jsx("button", { onClick: (e) => { e.stopPropagation(); handleDelete(fav.url); }, className: "vault-btn p-1 flex items-center justify-center border-none hover:bg-vault-cardBg", title: "Delete", children: _jsx(Trash2, { size: 14, className: "text-vault-muted hover:text-red-500" }) })] }))] }), _jsxs("div", { className: cn("flex-1", viewSize === 1 ? "flex items-center justify-between w-full ml-4" : "flex flex-col"), children: [_jsxs("div", { className: viewSize === 1 ? "flex-1 mr-4" : "", children: [_jsx("h3", { className: cn("font-bold mb-1 leading-snug cursor-pointer hover:text-vault-accent transition-colors", viewSize === 1 ? "text-base line-clamp-1" : "text-[15px] line-clamp-2"), children: fav.title || 'Untitled Reference' }), _jsx("p", { className: "text-xs text-vault-muted truncate max-w-[250px] font-mono opacity-80", title: fav.url, children: (fav.domain && fav.domain !== 'Unknown') ? fav.domain : (() => { try {
                                                                                        return new URL(fav.url).hostname.replace('www.', '');
                                                                                    }
                                                                                    catch {
                                                                                        return 'unknown';
                                                                                    } })() })] }), viewSize > 1 && (_jsxs("div", { className: "mt-3 space-y-1 mb-2 flex-1", children: [fav.author && (_jsxs("p", { className: "text-[11px] text-vault-text line-clamp-1", children: [_jsx("span", { className: "text-vault-muted", children: "By:" }), " ", fav.author] })), fav.actors && fav.actors.length > 0 && (_jsxs("p", { className: "text-[11px] text-vault-accent line-clamp-1 opacity-90", children: [_jsx("span", { className: "text-vault-muted", children: "With:" }), " ", fav.actors.join(', ')] })), (fav.views || fav.likes) && (_jsxs("p", { className: "text-[11px] text-vault-muted flex gap-3 mt-1", children: [fav.views && _jsxs("span", { children: [_jsx("strong", { children: fav.views }), " views"] }), fav.likes && _jsxs("span", { children: [_jsx("strong", { children: fav.likes }), " likes"] })] })), fav.tags && fav.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [fav.tags.slice(0, 3).map(tag => (_jsx("span", { className: "text-[9px] bg-vault-cardBg border border-vault-border px-1.5 py-0.5 rounded text-vault-muted inline-block", children: tag }, tag))), fav.tags.length > 3 && (_jsxs("span", { className: "text-[9px] bg-vault-cardBg/50 border border-vault-border border-dashed px-1.5 py-0.5 rounded text-vault-muted inline-block", children: ["+", fav.tags.length - 3] }))] }))] }))] }), _jsxs("div", { className: cn("flex items-center justify-between border-vault-border pt-3 mt-auto", viewSize === 1 ? "border-none ml-4 gap-4 mt-0 pt-0" : "border-t"), children: [_jsx("span", { className: "text-[11px] font-semibold text-vault-muted tracking-wider", children: new Date(fav.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }), _jsxs("a", { href: fav.url, target: "_blank", rel: "noreferrer", className: "text-[10px] font-bold text-vault-bg bg-vault-accent hover:bg-vault-accentHover transition-colors flex items-center gap-1 px-3 py-1.5 rounded-sm", children: ["OPEN ", _jsx(ChevronRight, { size: 12, strokeWidth: 3, className: "group-hover:translate-x-0.5 transition-transform" })] })] })] })] }, `${fav.url}-${idx}`))) })] }, groupName));
                                }), filtered.length === 0 && (_jsxs("div", { className: "py-24 text-center border border-dashed border-vault-border rounded-xl bg-vault-cardBg/30 flex flex-col items-center justify-center", children: [_jsx(Shield, { size: 48, className: "text-vault-border mb-4" }), _jsx("p", { className: "text-vault-muted text-sm font-semibold tracking-widest uppercase mb-2", children: "No encrypted items found" }), _jsx("p", { className: "text-xs text-vault-muted opacity-60", children: "Try scanning a new target domain or clearing your filters" })] }))] }) })] }), toastMessage && (_jsx("div", { className: cn("fixed bottom-6 right-6 z-[100] px-4 py-2 rounded shadow-2xl font-bold text-sm tracking-wide animate-in slide-in-from-bottom border", toastMessage.type === 'success' ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"), children: toastMessage.msg })), confirmDialog && (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4", children: _jsxs("div", { className: "bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95", children: [_jsxs("h3", { className: "text-vault-text font-bold mb-4 flex items-center gap-2", children: [_jsx(AlertTriangle, { size: 20, className: "text-vault-accent" }), " Confirm Action"] }), _jsx("p", { className: "text-vault-muted text-sm", children: confirmDialog.message }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => setConfirmDialog(null), className: "px-4 py-1.5 text-xs font-bold text-vault-muted hover:text-vault-text transition-colors", children: "Cancel" }), _jsx("button", { onClick: confirmDialog.onConfirm, className: "px-4 py-1.5 text-xs font-black bg-vault-accent text-vault-bg rounded hover:bg-vault-accentHover transition-all shadow-lg", children: "Confirm" })] })] }) })), promptDialog && (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4", children: _jsxs("div", { className: "bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95", children: [_jsxs("h3", { className: "text-vault-text font-bold mb-4 flex items-center gap-2", children: [_jsx(Shield, { size: 20, className: "text-vault-accent" }), " Input Required"] }), _jsx("p", { className: "text-vault-muted text-sm mb-3", children: promptDialog.message }), _jsx("input", { autoFocus: true, type: promptDialog.type === 'password' ? 'password' : 'text', className: "w-full bg-vault-bg border border-vault-border rounded p-2 text-sm text-vault-text focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent/30", onKeyDown: (e) => {
                                if (e.key === 'Enter')
                                    promptDialog.onConfirm(e.target.value);
                                if (e.key === 'Escape')
                                    setPromptDialog(null);
                            } }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => setPromptDialog(null), className: "px-4 py-1.5 text-xs font-bold text-vault-muted hover:text-vault-text transition-colors", children: "Cancel" }), _jsx("button", { onClick: (e) => promptDialog.onConfirm((e.currentTarget.parentElement?.previousElementSibling).value), className: "px-4 py-1.5 text-xs font-black bg-vault-accent text-vault-bg rounded hover:bg-vault-accentHover transition-all shadow-lg", children: "Submit" })] })] }) })), editingItem && (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4", onClick: () => setEditingItem(null), children: _jsxs("div", { className: "bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] animate-in zoom-in-95", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-vault-border", children: [_jsxs("h2", { className: "text-lg font-bold text-vault-text flex items-center gap-2", children: [_jsx(Edit2, { size: 20, className: "text-vault-accent" }), " Edit Metadata"] }), _jsx("button", { onClick: () => setEditingItem(null), className: "vault-btn p-1.5 rounded-full hover:bg-vault-bg border-none", children: _jsx(X, { size: 16, className: "text-vault-muted" }) })] }), _jsxs("div", { className: "p-6 overflow-y-auto space-y-4", children: [['title', 'author', 'domain', 'url', 'rawVideoSrc', 'quality', 'resolution', 'size', 'description'].map((field) => (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-vault-muted", children: field }), field === 'description' ? (_jsx("textarea", { className: "w-full bg-vault-bg border border-vault-border rounded p-2 text-sm text-vault-text focus:border-vault-accent outline-none min-h-[80px]", value: editingItem.current[field] || '', onChange: (e) => setEditingItem({ ...editingItem, current: { ...editingItem.current, [field]: e.target.value } }) })) : (_jsx("input", { type: field === 'url' ? 'url' : 'text', className: "w-full bg-vault-bg border border-vault-border rounded p-2 text-sm text-vault-text focus:border-vault-accent outline-none", value: editingItem.current[field] || '', onChange: (e) => setEditingItem({ ...editingItem, current: { ...editingItem.current, [field]: e.target.value } }) }))] }, field))), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-vault-muted", children: "Tags (Comma separated)" }), _jsx("input", { type: "text", className: "w-full bg-vault-bg border border-vault-border rounded p-2 text-sm text-vault-text focus:border-vault-accent outline-none", value: editingItem.current.tags?.join(', ') || '', onChange: (e) => setEditingItem({ ...editingItem, current: { ...editingItem.current, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } }) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-vault-muted", children: "Actors (Comma separated)" }), _jsx("input", { type: "text", className: "w-full bg-vault-bg border border-vault-border rounded p-2 text-sm text-vault-text focus:border-vault-accent outline-none", value: editingItem.current.actors?.join(', ') || '', onChange: (e) => setEditingItem({ ...editingItem, current: { ...editingItem.current, actors: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } }) })] })] }), _jsxs("div", { className: "p-4 border-t border-vault-border flex justify-end gap-3 bg-vault-bg", children: [_jsx("button", { onClick: () => setEditingItem(null), className: "px-5 py-2 text-xs font-bold text-vault-muted hover:text-vault-text transition-colors", children: "Cancel" }), _jsx("button", { onClick: () => saveEditedItem(editingItem.current, editingItem.original), className: "px-5 py-2 text-xs font-black bg-vault-accent text-vault-bg rounded hover:bg-vault-accentHover transition-all shadow-lg", children: "Save Changes" })] })] }) })), isSettingsOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer", onClick: () => setIsSettingsOpen(false), children: _jsxs("div", { className: "bg-vault-bg border border-vault-border rounded-lg shadow-2xl w-full max-w-2xl p-0 relative flex flex-col animate-in zoom-in-95 duration-200 cursor-default", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-vault-border bg-vault-cardBg", children: [_jsxs("h2", { className: "text-lg font-bold text-vault-text flex items-center gap-2", children: [_jsx(Settings, { size: 20, className: "text-vault-accent" }), " Advanced Options & Export"] }), _jsx("button", { onClick: () => setIsSettingsOpen(false), className: "vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-vault-bg border-none", children: _jsx(X, { size: 16, className: "text-vault-muted" }) })] }), _jsxs("div", { className: "p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-8", children: [_jsxs("section", { children: [_jsx("h3", { className: "text-sm font-black uppercase text-vault-muted mb-4 border-b border-vault-border pb-2 tracking-widest", children: "Data Portability" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-vault-cardBg border border-vault-border rounded p-4 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-vault-text font-bold", children: [_jsx(Download, { size: 18, className: "text-vault-accent" }), " Export Vault JSON"] }), _jsx("p", { className: "text-xs text-vault-muted leading-relaxed flex-1", children: "Download a complete JSON backup of all metadata, tags, and references safely to your local machine." }), _jsx("button", { onClick: handleExportVault, className: "vault-btn py-2 text-xs font-bold w-full bg-vault-accent/10 text-vault-accent border-vault-accent/30 hover:bg-vault-accent hover:text-vault-bg transition-colors", children: "Generate Backup" })] }), _jsxs("div", { className: "bg-vault-cardBg border border-vault-border rounded p-4 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-vault-text font-bold", children: [_jsx(Upload, { size: 18, className: "text-vault-accent" }), " Import Vault Backup"] }), _jsx("p", { className: "text-xs text-vault-muted leading-relaxed flex-1", children: "Restore a previously exported Vault JSON file. Note: Pre-existing duplicate URLs will be skipped." }), _jsxs("label", { className: "vault-btn py-2 text-xs font-bold w-full bg-vault-accent/10 text-vault-accent border-vault-accent/30 hover:bg-vault-accent hover:text-vault-bg transition-colors text-center cursor-pointer", children: ["Select JSON File", _jsx("input", { type: "file", accept: ".json", onChange: (e) => { handleImportVault(e); setIsSettingsOpen(false); }, className: "hidden" })] })] })] })] }), _jsxs("section", { children: [_jsx("h3", { className: "text-sm font-black uppercase text-red-500/80 mb-4 border-b border-red-900/30 pb-2 tracking-widest", children: "Danger Zone" }), _jsxs("div", { className: "bg-red-900/10 border border-red-900/30 rounded p-4 flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h4", { className: "text-red-400 font-bold flex items-center gap-2", children: [_jsx(AlertTriangle, { size: 16 }), " Wipe Vault Data"] }), _jsx("p", { className: "text-xs text-red-400/70 mt-1", children: "Permanently obliterate all bookmarks, metadata, and blob previews from IndexedDB." })] }), _jsx("button", { onClick: handleWipeVault, className: "vault-btn py-2 px-4 shadow-[0_0_15px_-3px_var(--color-red-500)] text-xs font-black uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white border-none whitespace-nowrap", children: "Wipe Database" })] })] })] })] }) })), playingVideo && (_jsx("div", { className: cn("fixed inset-0 z-50 flex items-center justify-center transition-all duration-700", isDimmed ? "bg-black/98" : "bg-black/80 backdrop-blur-sm"), onClick: () => { setPlayingVideo(null); setIsDimmed(false); }, children: _jsxs("div", { className: cn("w-[90vw] max-w-5xl bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl flex flex-col overflow-hidden transition-transform duration-500", playingVideo ? "scale-100 opacity-100" : "scale-95 opacity-0"), onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-vault-border bg-vault-bg/50", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setIsDimmed(!isDimmed), className: cn("vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full transition-all border border-vault-border/50", isDimmed ? "bg-vault-accent text-vault-bg" : "bg-vault-cardBg text-vault-muted hover:text-vault-accent"), title: isDimmed ? "Turn Lights ON" : "Turn Lights OFF", children: _jsx(Palette, { size: 16, fill: isDimmed ? "currentColor" : "none" }) }), _jsx("h3", { className: "font-bold text-lg text-vault-text line-clamp-1 pr-4", children: playingVideo.title || 'Untitled Video' })] }), _jsx("button", { title: "Close Player", onClick: () => { setPlayingVideo(null); setIsDimmed(false); }, className: "vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors border-none", children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "relative w-full aspect-video bg-black flex items-center justify-center group/player", children: playingVideo.type === 'video' && playingVideo.rawVideoSrc && !videoError ? (_jsxs("div", { className: "w-full h-full relative", children: [_jsx("video", { src: playingVideo.rawVideoSrc, autoPlay: true, controls: true, preload: "auto", className: "w-full h-full object-contain", playsInline: true, onError: () => setVideoError(true) }), _jsx("div", { className: "absolute top-4 left-4 z-20 pointer-events-none transition-opacity group-hover/player:opacity-100 opacity-20 group-hover/player:delay-100", children: _jsxs("div", { className: "flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-sm border border-vault-accent/30 backdrop-blur-md", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-vault-accent animate-pulse" }), _jsxs("span", { className: "text-[10px] font-mono font-bold text-vault-accent uppercase tracking-widest", children: ["Vault Stream: ", playingVideo.quality || playingVideo.resolution || 'AUTO'] })] }) })] })) : videoError ? (_jsxs("div", { className: "text-center space-y-4 p-6", children: [_jsx(AlertTriangle, { className: "mx-auto text-yellow-500", size: 48 }), _jsxs("div", { children: [_jsx("h4", { className: "text-vault-text font-bold text-lg mb-1", children: "Playback Failed" }), _jsx("p", { className: "text-vault-muted text-sm", children: "The media link may have expired or is blocked by CORS." })] }), _jsxs("div", { className: "flex justify-center gap-3 mt-4", children: [_jsx("button", { className: "vault-btn text-sm px-4 py-2 flex items-center gap-2", onClick: async () => {
                                                    if (!playingVideo)
                                                        return;
                                                    setIsRefreshing(true);
                                                    setVideoError(false);
                                                    try {
                                                        const response = (await browser.runtime.sendMessage({
                                                            action: "extract_fresh_m3u8",
                                                            url: playingVideo.url
                                                        }));
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
                                                        }
                                                        else {
                                                            setVideoError(true);
                                                        }
                                                    }
                                                    catch (err) {
                                                        console.error("Refresh failed:", err);
                                                        setVideoError(true);
                                                    }
                                                    finally {
                                                        setIsRefreshing(false);
                                                    }
                                                }, disabled: isRefreshing, children: isRefreshing ? 'Refreshing Link...' : 'Try Refreshing Link' }), _jsx("a", { href: playingVideo.url, target: "_blank", rel: "noreferrer", className: "vault-btn text-sm px-4 py-2 bg-vault-accent text-vault-bg flex items-center gap-2 hover:bg-vault-accentHover", children: "Open Original Page" })] })] })) : (_jsx("video", { src: playingVideo.rawVideoSrc || undefined, controls: true, autoPlay: true, className: "w-full h-full outline-none", onError: () => setVideoError(true), children: _jsx("source", { src: playingVideo.rawVideoSrc || undefined }) })) }), _jsxs("div", { className: "p-4 bg-vault-cardBg flex items-center justify-between text-sm text-vault-muted", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-vault-text", children: playingVideo.domain || new URL(playingVideo.url).hostname }), playingVideo.author && _jsxs("span", { className: "ml-2 px-2 border-l border-vault-border", children: ["By: ", playingVideo.author] })] }), _jsx("div", { className: "font-mono text-xs", children: new Date(playingVideo.timestamp).toLocaleString() })] })] }) }))] }));
};
