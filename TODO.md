# Favorites Central - Development To-Do List

This list maps out the implementation of the core functionalities requested in `AGENT.md`.

## Data Handling & Notifications
- [x] **1. Content Script: Visual Notifications & In-page UI**
  - Inject an SVG icon with high contrast into the HTML node being captured (<20% width, top-left).
  - Show a visual spinner/loading cue during the extraction sequence.
  - Implement a green toast notification on successful save.
  - On failure, show an error state, remove the icon, and prompt to try again.
- [x] **2. Background Logic: Hidden Tab Extraction**
  - Create hidden tabs to open video `src` or `href` attributes closest to the cursor.
  - Implement heuristics (timeouts, common names, `querySelector` regex) to find the primary video player.
  - Intercept `.m3u8` streaming network requests out of the player if raw file links are unavailable.
  - Auto-close the tab once the extraction finishes or times out.
- [x] **3. Background Logic: Metadata & Snippet Generation**
  - On successful source capture, record a large snapshot.
  - Harvest page metadata (title, author, tags, duration, views).
  - Attempt to slice a short video snippet or capture an array of frames to act as a preview.

## Dashboard Design & Layout
- [x] **4. Dashboard Header & Theming**
  - Implement predefined skins + Custom CSS upload mechanism.
  - Left side: Logo, Author, Version, VaultWares link.
  - Right side: Light/Dark toggle, Settings gear, Search Bar.
- [x] **5. Dashboard Sidebar**
  - Implement a collapsible sidebar.
  - Add 'Group By' dropdown (defaulting to Hostname).
  - Add View Type slider mimicking Windows 11 (Biggest, Large, Medium, Small, Details).
  - Implement sorting and filtering mechanisms based on the captured metadata.
- [x] **6. Grid, Sections & Scroll Behavior**
  - Configure flex grid containing a maximum of 2 rows per section before adding pagination within the section.
  - Impose a soft limit of 50 sections but activate infinite scrolling.
  - Add the ability to click on a section header to open an isolated section-only view with a 'Back' button.

## Dashboard Interactivity
- [x] **7. Item Card UI Redesign**
  - Make cards rectangular with rounded corners and light shadows.
  - Thumbnail at 100% width, with an on-hover video/carousel preview.
  - Duration badge in the bottom-right of the thumbnail.
  - Quick action icons: Edit (top-left) and Delete (top-right).
  - Layout details under thumbnail: Title, date, view count.
  - Expandable metadata section: Description, author, tags, etc.
- [x] **8. Video Player Modal**
  - Implement centered, non-fullscreen, autoplay popup player when clicking an item.
  - Setup 'click-outside-to-close' and regular controls.
  - If the link fails (`m3u8` expired), open a hidden tab with a loading icon to refresh the source link before playing.
  - If fully unrecoverable, prompt the user to delete it.