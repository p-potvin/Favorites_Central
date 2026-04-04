import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as LucideIcons from 'lucide-react';
/**
 * Lucide-React Chrome Extension CSP Wrapper
 * As documented extensively on StackOverflow and GitHub issues,
 * lucide-react occasionally injects inline styles (or empty style objects)
 * which violates Chrome Extension Manifest V3's strict Content Security Policy.
 * We implement this wrapper over the module to force `style={undefined}`
 * ensuring they render cleanly without CSP errors.
 */
function createExtensionSafeIcon(IconComponent) {
    const IconWrapper = forwardRef((props, ref) => (_jsx(IconComponent, { ref: ref, ...props, style: undefined })));
    IconWrapper.displayName = IconComponent.displayName || 'VaultIcon';
    return IconWrapper;
}
// --- Vault Dashboard Icons ---
export const Heart = createExtensionSafeIcon(LucideIcons.Heart);
export const Search = createExtensionSafeIcon(LucideIcons.Search);
export const Shield = createExtensionSafeIcon(LucideIcons.Shield);
export const ShieldAlert = createExtensionSafeIcon(LucideIcons.ShieldAlert);
export const ShieldCheck = createExtensionSafeIcon(LucideIcons.ShieldCheck);
export const Settings = createExtensionSafeIcon(LucideIcons.Settings);
export const Palette = createExtensionSafeIcon(LucideIcons.Palette);
export const Menu = createExtensionSafeIcon(LucideIcons.Menu);
export const FolderTree = createExtensionSafeIcon(LucideIcons.FolderTree);
export const Folders = createExtensionSafeIcon(LucideIcons.Folders);
export const ArrowDownAZ = createExtensionSafeIcon(LucideIcons.ArrowDownAZ);
export const LayoutTemplate = createExtensionSafeIcon(LucideIcons.LayoutTemplate);
export const LayoutGrid = createExtensionSafeIcon(LucideIcons.LayoutGrid);
export const ChevronRight = createExtensionSafeIcon(LucideIcons.ChevronRight);
export const ChevronLeft = createExtensionSafeIcon(LucideIcons.ChevronLeft);
export const ArrowLeft = createExtensionSafeIcon(LucideIcons.ArrowLeft);
export const Trash2 = createExtensionSafeIcon(LucideIcons.Trash2);
export const Trash = createExtensionSafeIcon(LucideIcons.Trash);
export const Edit2 = createExtensionSafeIcon(LucideIcons.Edit2);
export const FileEdit = createExtensionSafeIcon(LucideIcons.FileEdit);
export const Play = createExtensionSafeIcon(LucideIcons.Play);
export const PlayCircle = createExtensionSafeIcon(LucideIcons.PlayCircle);
export const X = createExtensionSafeIcon(LucideIcons.X);
export const CircleX = createExtensionSafeIcon(LucideIcons.CircleX);
export const AlertTriangle = createExtensionSafeIcon(LucideIcons.AlertTriangle);
export const AlertCircle = createExtensionSafeIcon(LucideIcons.AlertCircle);
export const RefreshCw = createExtensionSafeIcon(LucideIcons.RefreshCw);
export const Loader2 = createExtensionSafeIcon(LucideIcons.Loader2);
export const Lock = createExtensionSafeIcon(LucideIcons.Lock);
export const Download = createExtensionSafeIcon(LucideIcons.Download);
export const FileJson = createExtensionSafeIcon(LucideIcons.FileJson);
export const Upload = createExtensionSafeIcon(LucideIcons.Upload);
export const FileUp = createExtensionSafeIcon(LucideIcons.FileUp);
export const PanelLeftClose = createExtensionSafeIcon(LucideIcons.PanelLeftClose);
export const PanelLeftOpen = createExtensionSafeIcon(LucideIcons.PanelLeftOpen);
export const Sidebar = createExtensionSafeIcon(LucideIcons.Sidebar);
// --- Pin Entry additional Icons ---
export const Unlock = createExtensionSafeIcon(LucideIcons.Unlock);
export const Key = createExtensionSafeIcon(LucideIcons.Key);
export const Fingerprint = createExtensionSafeIcon(LucideIcons.Fingerprint);
export const Eye = createExtensionSafeIcon(LucideIcons.Eye);
export const EyeOff = createExtensionSafeIcon(LucideIcons.EyeOff);
export const Hash = createExtensionSafeIcon(LucideIcons.Hash);
