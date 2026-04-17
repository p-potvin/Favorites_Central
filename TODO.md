# 🎯 Vault Central Development Roadmap (VaultWares Standards)

## 🛡️ Phase 1: Core Standard & Cleanup

- [x] **Naming Consistency**: Rename \src/components/Dashboard.tsx\ to \src/components/VaultDashboard.tsx\ per [instructions.md](.github/instructions.md).
- [x] **Redundant Purge**: Manually delete \Dashboard-v4.tsx\, \Dashboard.tsx-v2\, \Dashboard.tsx-v3\, and other versioned artifacts.
- [x] **Type Safety**: Purged \any\ from pipelines and updated schemas to include 15+ metadata fields.
- [x] **Theme Logic**: Align Dashboard theme logic with [STYLE.md](.github/STYLE.md) (Skins 1-9 light/dark mapping).

## ⌨️ Phase 2: Input & Interaction (AGENT.md Alignment)

- [x] **Shortcut ALT+X**: Implement "Capture under mouse" logic in [content.ts](src/scripts/content.ts).
    - [x] Calculate "closest to mouse pointer" element (Bresenham-lite search).
    - [x] Handle silent hidden tab creation for m3u8 interception.
- [x] **Shortcut ALT+C**: Verify command mapping to open the [VaultDashboard.tsx](src/components/VaultDashboard.tsx).

## 📊 Phase 3: Dashboard UI/UX (VaultWares Design) [COMPLETED]

- [x] **Header Refinement**:
    - [x] Ensure VaultWares logo and link are present.
    - [x] Implement the "Secure Media Vault" sub-header.
    - [x] Removed clear toggle icon for sidebar (Hamburger Menu instead of duplicate Shield).
    - [x] Flatten header styling (removed floating rounded corners and hover effect).
- [ ] **Side-Panel**:
    - [x] Verify "Group By Hostname" as default.
    - [x] Implement "View Types" slider and state initialization via localStorage.
    - [ ] Add explicit "UI Theme" dropdown selector to replace hard-to-find toggle.
- [ ] **Filtering & Sorting**:
    - [x] Implement universal filter across all metadata fields.
    - [ ] Implement multi-field sorting with ASC/DESC toggle.
    - [x] Align search bar inputs and layout sizing.
- [ ] **Grid & Pagination**:
    - [x] Implement Pagination logic per section with \lucide-react\ Chevron icons.
    - [x] Implement Infinite Scrolling (50 section limit per load).
    - [x] Adjust visible items count to accurately reflect active pagination state.
    - [ ] Adjust Card Heights on specific view settings (preventing excessive vertical empty space).
    - [ ] Details view: Enforce proper padding and minimum height for rows.

## 🎥 Phase 4: Item Behavior & Player [COMPLETED]

- [ ] **Hover Feedback**:
    - [ ] Implement thumbnail hover effect (Overlay, scanning animation, play preview).
    - [ ] Internalize duration/meta into thumbnail (Target-lock style corners).
    - [ ] Bottom-right duration badge.
- [x] **Action Icons**:
    - [x] Top-left: Edit Metadata (Internalized to Thumb). Hide on List views.
    - [x] Top-right: Delete Item (Internalized to Thumb). Hide on List views.
- [~] **Prop Player**:
    - [x] Centered modal (non-fullscreen).
    - [x] Autoplay/Controls.
    - [ ] "Hidden Tab Refresh" for expired m3u8 links.
- [ ] **Data Formatting & Fallbacks**:
    - [ ] Cap rendering of all fractional numbers/decimals to 2 decimal places.
    - [ ] Add SVG graphic fallback for broken/missing thumbnail images across cards.
- [ ] **Tab Management**:
    - [x] Enforce singleton tab (prevent opening duplicate dashboards).
    - [ ] Automatically refresh the data view on regaining visibility / tab focus.

## 🧠 Phase 5: Vault Intelligence (Advanced Previews) [COMPLETED]

- [x] **Binary Storage**: Dexie.js (IndexedDB) for storing high-fidelity preview Blobs.
- [x] **Offscreen Processor**: FFmpeg WASM implementation via \chrome.offscreen\.
- [ ] **YouTube-style Preview**: 10 chunks of 2s muted WebM playback on hover.
- [x] **Automated Processing**: Background job triggered immediately on save.
- [ ] **Fault Tolerance**: Manual recovery job triggered on hover if >30s elapsed since save.
- [x] **Theatrical Player**: Immersive video player with "Light Dimmer" (Palette icon).
- [ ] **Browser Sync**: Multi-device state syncing (Firefox/Chrome APIs) [Metadata Only].

## 🔒 Phase 6: Security & Privacy (PIN System) [COMPLETED]

- [x] **Proton-style PIN**: Optional 4 or 6-digit PIN system.
- [ ] **Secure Popup**: Rounded 4/6 input boxes with automatic transition and focus.
- [x] **Persistent Lock**: Memory-only database loading until authenticated.
- [x] **DevTools Hardening**: AES-256 encryption for IndexedDB Blobs using PIN as salt.
- [x] **In-Memory Logic**: \getSavedVideos\ logic blocked by \isVaultLocked()\ check.
- [x] **Idle Timeout**: Dropdown configuration (10m, 30m, 1h, 2h, Never).
- [x] **Locker UI**: Visual "Vault Unlocked" vs "Authenticating" states in popup.

## 🔔 Phase 7: Site Injections & Notifications [COMPLETED]

- [x] **Sync Indicators**: Green "Cloud-Heart" icon injected into thumbnails/links of saved items.
- [x] **Capture Toast**: Notification when starting capture via Alt+X (with spinner).
- [ ] **Contextual Metadata**: In-DOM extraction of author, views, and tags during capture.
- [x] **Success/Failure Toasts**: Interactive, translucent notifications with security-focused messaging.
- [x] **Real-time Updates**: MutationObserver automatically updates indicators when site content scrolls/reloads.

## NEXT STEPS

- [x] Fix database wipe issue: The database gets wiped when saving an item while the dashboard is locked. It should allow adding items even if locked.
- [x] Fix heart indicator position: The heart indicator (from Phase 7) is currently positioned under the cursor when receiving a callback, but the user might have moved. It needs to be tied to the original item.
- [x] Notification stacking: Implement a system to stack notifications for multiple requests, with a limit of 10 concurrent requests. Notifications should disappear when resolved.
- [ ] Button styling (Sync enabled): When sync is enabled, the button should be fully colored (like on hover but without dashed border). On hover, add the dashed border.
- [ ] Details view UI (view mode == 1): The details view is currently very basic and doesn't utilize the full width of the card. It needs a complete UI overhaul to display all metadata fields in a clean and organized manner.
- [ ] Make main item taller (60px).
- [ ] Fix "V-ID" badge centering.

## 🧹 Phase 8: Optimization & Refactoring [COMPLETED]

- [x] **Constant Extraction**: Centralized hardcoded strings and config in `src/lib/constants.ts`.
- [x] **Redundant Deletion**: (Manual) Cleaned up `.js` artifacts and temporary test scripts.
- [x] **Storage Hardening**: Switched to `STORAGE_KEYS` across `storage-vault` and `background`.
- [x] **Type Validation**: Implemented Zod schema parsing in storage retrieval for data integrity.
- [x] **Dashboard Singleton**: Hardened singleton logic using both URL and stored Tab ID.

## 🔮 Phase 9: Future Vault Features

- [ ] **Vault Portability**: Export/Import JSON logic.
- [ ] **Multi-Type Support**: Music, Torrents, and Bookmarks.

## Background Tab Extraction Logic (ALT+X)

- [ ] **Address tab extraction return conditions**: Right now, we give up too fast, this gives us only false positives and the few who actually work have no thumbnails and faulty metadata. We NEED TO OPEN EVERY LINK even if it's link to a direct video, everytime without exception. There will always be a tab opening each time you hit ALT+X.Once the tab is opened,we need to address the focus issue. The content of the tab doesn't autoplay (or maybe even doesn't load) until we physically open the tab. This is fixable. Once we open the tab, the Webm capture works as expected, the video jumps every 2 seconds 10 times, but after that its nowhere to be seen. We cant debug the DB so we need a new approach. Add debug tools for indexedDB and logs. Next we investigate the behavior of the scan that happens on the dashboard. It doesn't go anywhere, never loads anything, never stops. Back to the tab extraction: we need to add a persistence layer to the algorithm, never come back without a video link and if you do you better have a link to another media type.


- [ ] **Element Targeting**: Refine element selection to accurately capture the intended media or content, considering dynamic page structures.
- [ ] **Dynamic Content Handling**: Implement strategies for extracting content from dynamically loaded elements or single-page applications.
