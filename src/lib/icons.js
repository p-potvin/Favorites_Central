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
// Dashboard/Sidebar
export const ViewModeIcon = createExtensionSafeIcon(LucideIcons.SlidersHorizontal); // for view mode
export const ThemeIcon = createExtensionSafeIcon(LucideIcons.Palette); // for theme
export const SettingsIcon = createExtensionSafeIcon(LucideIcons.Settings); // for settings/advanced
export const SearchIcon = createExtensionSafeIcon(LucideIcons.Search); // for search
export const GroupIcon = createExtensionSafeIcon(LucideIcons.FolderTree); // for group by
export const SortIcon = createExtensionSafeIcon(LucideIcons.ArrowDownAZ); // for sort
export const PinIcon = createExtensionSafeIcon(LucideIcons.Lock); // for PIN protection
export const ExportIcon = createExtensionSafeIcon(LucideIcons.FileJson); // for export
export const ImportIcon = createExtensionSafeIcon(LucideIcons.FileUp); // for import
export const DebugIcon = createExtensionSafeIcon(LucideIcons.Bug); // for debug logs
export const DeleteIcon = createExtensionSafeIcon(LucideIcons.Trash); // for delete
export const EditIcon = createExtensionSafeIcon(LucideIcons.FileEdit); // for edit
export const PlayIcon = createExtensionSafeIcon(LucideIcons.PlayCircle); // for play/open
export const BackIcon = createExtensionSafeIcon(LucideIcons.ArrowLeft); // for back
export const ChevronLeftIcon = createExtensionSafeIcon(LucideIcons.ChevronLeft);
export const ChevronRightIcon = createExtensionSafeIcon(LucideIcons.ChevronRight);
export const CloseIcon = createExtensionSafeIcon(LucideIcons.CircleX); // for close/cancel
export const AlertIcon = createExtensionSafeIcon(LucideIcons.AlertCircle); // for alert/warning
export const LoaderIcon = createExtensionSafeIcon(LucideIcons.Loader2); // for loading
export const RefreshIcon = createExtensionSafeIcon(LucideIcons.RefreshCw); // for refresh
// Pin Entry
export const UnlockIcon = createExtensionSafeIcon(LucideIcons.Unlock);
export const KeyIcon = createExtensionSafeIcon(LucideIcons.Key);
export const FingerprintIcon = createExtensionSafeIcon(LucideIcons.Fingerprint);
export const EyeIcon = createExtensionSafeIcon(LucideIcons.Eye);
export const EyeOffIcon = createExtensionSafeIcon(LucideIcons.EyeOff);
export const HashIcon = createExtensionSafeIcon(LucideIcons.Hash);
