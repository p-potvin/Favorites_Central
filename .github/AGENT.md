# Project Favorites Central

## Intended Extension Functionalities

* A browser (chromium or gecko based) extension that can be published (listed or unlisted) on the browsers respective stores. This extension's primary goal is to locally save video links from video/thumbnails that you hover with your cursor so that you don't have to open the link yourself. It also offers a personal customizable dashboard to visualize all your favorites when clicking its icon.

### The Data Handling
** While this is primarily for use on video thumbnails, it should work for other links: the source video, images, website link, songs (audio files), torrents/magnet links, your own bookmarks and more to come. **

**When entering the shortcut *(Default: ALT+X)*:**
	- when hovering a video thumbnail: 
		1. It tries to obtain the real video source by opening the video src or link attribute *(with or without a video file extension)* that is closest to the mouse pointer.
		2. It opens the link as silently (hidden) as possible and tries to fetch the source from the new page using timeouts, querySelector regex, common video player names, classes or ids. It tries to select the most likely candidate based on the number of criteria it fits, its position in the page, its size, whatever can identify the **MAIN video player.**
		3. Once an element has been found, it tries to capture the source:
			- if it's a straightforward link to a video *(matching the file extension)* save it.
			- if its a blob or other unattainable link: once the page is fully loaded and a short timeout has occured, it should trigger the video player to then intercept *.m3u8 (or other types of streaming) requests* and save the link.
		4. While saving the link, save a snapshot as big as possible and all the metadata available *and if possible, a short video snippet or an array of frames to create a preview.*
		5. If nothing is found on the new page, it saves the original link with all the metadata available on the original page and tries to assign a type of media to it.
		

All of this is saved in a persistent way using your local storage and comes bundled with a companion script that is actually a Scheduled Task to backup all your data after a certain delay and when you save a new item. This script is optional but available for download **[On the official GitHub](https://github.com/p-potvin/favorites_central/scheduled-task/)**

### The Personal Dashboard

**When entering the shortcut *(Default: ALT+C)*: a new tab is opened displaying the personal dashboard**

1. The dashboard offers a variety of pre-made skins as well as a way to upload your own CSS. 
2. The dashboard's header comes equipped with: **The extension's logo, author and version and a small link to VaultWares.com on the left, a light/night mode switch, a gear icon to show the extension's settings and a search bar on the left.** 
3. Then there is a collapsible side-panel on the side *(Default: Left)* with: **a 'group by' dropdown (*(Default: Hostname)* to organize the items into sections that are also collapsible, filters and sort options based on our captured metadata fields and view types.** The view types are represented by a slider similar to the one in *Windows 11/10 Explorer.exe* and offers these views: **Biggest/Large/Medium/Small/Details**.
4. The sections are arranged in a flex grid with a maximum number of rows *(Default: 2)* after which pagination is added.  The number of section is limited *(Default: 50)* but the dashboard is equipped with infinite scrolling. It is possible to click on a section to open a new view to display only the section's items with a back button at the top.

### Item Look and Behavior

The items are rectangular boxes with rounded corners and a light shadow. They consist of the following: **A thumbnail at full width (if possible with an hover effect that triggers a video/carousel preview), A badge in the bottom right of the thumbnail containing the duration, an icon to edit the item's metadata in the top left corner and an icon to delete the item in the top right corner.** Then under the thumbnail: **The title, date and number of views. Under this is an expendable section containing: a description, author, tags, any metadata that was captured.**

When clicking on an item, a video player should pop open *(centered, not fullscreen, autoplay on, controls on, clicking outside closes it).* If the source is an expired m3u8 link or other type, it will first open the link in a hidden tab to get a fresh link while displaying a loading icon then play the source. If the link is expired it will tell the user and offer to delete.

### Notifications

When saving an item, it preemptively adds an svg icon *(filled in and with a large contrasting stroke)* inside the HTML node *(around <20% of the item's width, top left corner, should never disturb the layout in place).* While waiting for the hidden tab's response it will display a visual cue that something is processing. Once it gets the response from the hidden tab, it removes the spinner and shows a green toast notification if the response if positive (the video link was saved). If the response is negative, it captures the closest link with a screenshot/snapshot of the page. If there are no links of any kind, it removes the icon and asks the user to try another item.


## Future Functionalities and Improvements
- Implement a way to edit the metadata of an item and to add custom tags/labels/playlists to it.
- Implement a PIN system that locks the dasboard behind a 4-6 number code after a certain period of inactivity or when opening the dashboard for the first time in a session. This is optional and Off by default and can be turned on/off in the settings. It auto connects when the correct PIN is entered.
- Implement a way to export and import your vault.
- Implement a way to sync your vault across devices.
- Implement a way to save other types of media such as music, images, torrents, bookmarks and more.
- Implement a way to automatically organize your vault based on playlists, labels,tags, type of media

