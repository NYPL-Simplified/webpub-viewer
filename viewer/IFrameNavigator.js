var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CacheStatus } from "./Cacher";
import Manifest from "./Manifest";
import EPub from "./EPub";
import EventHandler from "./EventHandler";
// import * as BrowserUtilities from "./BrowserUtilities";
import * as HTMLUtilities from "./HTMLUtilities";
import * as IconLib from "./IconLib";
const epubReadingSystemObject = {
    name: "Webpub viewer",
    version: "0.1.0",
};
const epubReadingSystem = Object.freeze(epubReadingSystemObject);
const upLinkTemplate = (label, ariaLabel) => `
  <a rel="up" aria-label="${ariaLabel}" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" width="${IconLib.WIDTH_ATTR}" height="${IconLib.HEIGHT_ATTR}" viewBox="${IconLib.VIEWBOX_ATTR}" aria-labelledby="up-label" preserveAspectRatio="xMidYMid meet" role="img" class="icon">
      <title id="up-label">${label}</title>
      ${IconLib.icons.home}
    </svg>
    <span class="setting-text up">${label}</span>
  </a>
`;
const template = `
  <nav class="publication">
    <div class="controls">
        ${IconLib.icons.closeOriginal}
        ${IconLib.icons.checkOriginal}
      <a href="#settings-control" class="scrolling-suggestion" style="display: none">
          We recommend scrolling mode for use with screen readers and keyboard navigation.
          Go to settings to switch to scrolling mode.
      </a>
      <ul  id="top-control-bar" class="links top active">
        <li>
          <button class="contents disabled" aria-labelledby="contents-label" aria-haspopup="true" aria-expanded="false">
            ${IconLib.icons.toc}
            ${IconLib.icons.closeDupe}
            <label class="setting-text contents" id="contents-label">Table Of Contents</label>
          </button>
          <div class="contents-view controls-view inactive" aria-hidden="true"></div>
        </li>
        <li>
          <button id="settings-control" class="settings" aria-labelledby="settings-label" aria-expanded="false" aria-haspopup="true">
            ${IconLib.icons.settings}
            ${IconLib.icons.closeDupe}
            <label class="setting-text settings" id="settings-label">Settings</label>
          </button>
          <div class="settings-view controls-view inactive" aria-hidden="true"></div>
        </li>
      </ul>
    </div>
    <!-- /controls -->
  </nav>
  <main style="overflow: hidden">
    <div class="loading" style="display:none;">
      ${IconLib.icons.loading}
    </div>
    <div class="error" style="display:none;">
      <span>
        ${IconLib.icons.error}
      </span>
      <span>There was an error loading this elephant page.</span>
      <button class="go-back">Go back</button>
      <button class="try-again">Try again</button>
    </div>
    <div class="info top">
      <span class="book-title"></span>
    </div>
    <div class="page-container">
        <div id="prev-page-btn" class="flip-page-container">
            <button class="flip-page-btn prev">
                <svg viewBox="0 0 24 24" role="img" width="24" height="24"
                aria-labelledby="next-page-btn-title" class="flip-page-icon prev">
                    <title id="next-page-btn-title">Switch to next page</title>
                    <path d="M16.59 8.59 L12 13.17 7.41 8.59 6 10 l6 6 6-6-1.41-1.41z"/>
                </svg>
            </button>
        </div>
        <div id="iframe-container" tabindex=0>
            <iframe tabindex=-1 allowtransparency="true" title="book text" style="border:0; overflow: hidden;"></iframe>
        </div>
        <div id="next-page-btn" class="flip-page-container">
            <button class="flip-page-btn next">
                <svg viewBox="0 0 24 24" role="img" width="24" height="24"
                    aria-labelledby="next-page-btn-title" class="flip-page-icon next">
                    <title id="next-page-btn-title">Switch to next page</title>
                    <path d="M16.59 8.59 L12 13.17 7.41 8.59 6 10 l6 6 6-6-1.41-1.41z"/>
                </svg>
            </button>
        </div>
    </div>
    <div class="info bottom">
      <span class="chapter-position"></span>
      <span class="chapter-title"></span>
    </div>
  </main>
  <nav class="publication">
    <div class="controls">
      <ul id="bottom-control-bar" class="links bottom active">
        <li>
          <a rel="prev" class="disabled" role="button" aria-labelledby="previous-label">
          ${IconLib.icons.previous}
          <span class="chapter-control" id="previous-label">Previous Chapter</span>
          </a>
        </li>
        <li aria-label="chapters">Chapters</li>
        <li>
          <a rel="next" class="disabled" role="button" aria-labelledby="next-label">
            <span class="chapter-control" id ="next-label">Next Chapter</span>
            ${IconLib.icons.next}
          </a>
        </li>
      </ul>
    </div>
    <!-- /controls -->
  </nav>
`;
/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator {
    constructor(store, cacher = null, settings, annotator = null, publisher = null, serif = null, sans = null, day = null, sepia = null, night = null, paginator = null, scroller = null, eventHandler = null, upLinkConfig = null, allowFullscreen = null) {
        this.upLink = null;
        this.fullscreen = null;
        this.canFullscreen = document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;
        this.store = store;
        this.cacher = cacher;
        this.settings = settings;
        this.annotator = annotator;
        this.publisher = publisher;
        this.serif = serif;
        this.sans = sans;
        this.day = day;
        this.sepia = sepia;
        this.night = night;
        this.paginator = paginator;
        this.scroller = scroller;
        this.eventHandler = eventHandler || new EventHandler();
        this.upLinkConfig = upLinkConfig;
        this.allowFullscreen = allowFullscreen;
    }
    static create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const navigator = new this(config.store, config.cacher || null, config.settings, config.annotator || null, config.publisher || null, config.serif || null, config.sans || null, config.day || null, config.sepia || null, config.night || null, config.paginator || null, config.scroller || null, config.eventHandler || null, config.upLink || null, config.allowFullscreen || null);
            yield navigator.start(config.element, config.manifestUrl);
            return navigator;
        });
    }
    start(element, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            element.innerHTML = template;
            this.manifestUrl = manifestUrl;
            try {
                this.pageContainer = HTMLUtilities.findRequiredElement(element, ".page-container");
                this.iframe = HTMLUtilities.findRequiredElement(element, "iframe");
                this.scrollingSuggestion = HTMLUtilities.findRequiredElement(element, ".scrolling-suggestion");
                this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]");
                this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]");
                this.contentsControl = HTMLUtilities.findRequiredElement(element, "button.contents");
                this.settingsControl = HTMLUtilities.findRequiredElement(element, "button.settings");
                this.links = HTMLUtilities.findRequiredElement(element, "ul.links.top");
                this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul.links.bottom");
                this.tocView = HTMLUtilities.findRequiredElement(element, ".contents-view");
                this.settingsView = HTMLUtilities.findRequiredElement(element, ".settings-view");
                this.loadingMessage = HTMLUtilities.findRequiredElement(element, "div[class=loading]");
                this.errorMessage = HTMLUtilities.findRequiredElement(element, "div[class=error]");
                this.tryAgainButton = HTMLUtilities.findRequiredElement(element, "button[class=try-again]");
                this.goBackButton = HTMLUtilities.findRequiredElement(element, "button[class=go-back]");
                this.infoTop = HTMLUtilities.findRequiredElement(element, "div[class='info top']");
                this.infoBottom = HTMLUtilities.findRequiredElement(element, "div[class='info bottom']");
                this.bookTitle = HTMLUtilities.findRequiredElement(this.infoTop, "span[class=book-title]");
                this.chapterTitle = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-title]");
                this.chapterPosition = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-position]");
                // this.menuControl = HTMLUtilities.findRequiredElement(element, "button.trigger") as HTMLButtonElement;
                this.newPosition = null;
                this.newElementId = null;
                this.isBeingStyled = true;
                this.isLoading = true;
                this.setupEvents();
                if (this.publisher) {
                    this.publisher.bookElement = this.iframe;
                }
                if (this.serif) {
                    this.serif.bookElement = this.iframe;
                }
                if (this.sans) {
                    this.sans.bookElement = this.iframe;
                }
                if (this.day) {
                    this.day.bookElement = this.iframe;
                }
                if (this.sepia) {
                    this.sepia.bookElement = this.iframe;
                }
                if (this.night) {
                    this.night.bookElement = this.iframe;
                }
                if (this.paginator) {
                    this.paginator.bookElement = this.iframe;
                }
                if (this.scroller) {
                    this.scroller.bookElement = this.iframe;
                }
                this.settings.renderControls(this.settingsView);
                this.settings.onFontChange(this.updateFont.bind(this));
                this.settings.onFontSizeChange(this.updateFontSize.bind(this));
                this.settings.onViewChange(this.updateBookView.bind(this));
                // Trap keyboard focus inside the settings view when it's displayed.
                const settingsButtons = this.settingsView.querySelectorAll("button");
                if (settingsButtons && settingsButtons.length > 0) {
                    const lastSettingsButton = settingsButtons[settingsButtons.length - 1];
                    this.setupModalFocusTrap(this.settingsView, this.settingsControl, lastSettingsButton);
                }
                if (this.cacher) {
                    this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this));
                    this.enableOffline();
                }
                if (this.scroller && this.settings.getSelectedView() !== this.scroller) {
                    this.scrollingSuggestion.style.display = "block";
                }
                return yield this.loadManifest();
            }
            catch (err) {
                // There's a mismatch between the template and the selectors above,
                // or we weren't able to insert the template in the element.
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    setupEvents() {
        this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));
        const delay = 200;
        let timeout;
        window.addEventListener("resize", () => {
            clearTimeout(timeout);
            timeout = setTimeout(this.handleResize.bind(this), delay);
        });
        this.previousChapterLink.addEventListener("click", this.handlePreviousChapterClick.bind(this));
        this.nextChapterLink.addEventListener("click", this.handleNextChapterClick.bind(this));
        this.contentsControl.addEventListener("click", this.handleContentsClick.bind(this));
        this.settingsControl.addEventListener("click", this.handleSettingsClick.bind(this));
        this.settingsView.addEventListener("click", this.handleToggleLinksClick.bind(this));
        this.tryAgainButton.addEventListener("click", this.tryAgain.bind(this));
        this.goBackButton.addEventListener("click", this.goBack.bind(this));
        // this.menuControl.addEventListener("click", this.handleToggleLinksClick.bind(this));
        this.contentsControl.addEventListener("keydown", this.hideTOCOnEscape.bind(this));
        this.tocView.addEventListener("keydown", this.hideTOCOnEscape.bind(this));
        this.settingsControl.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));
        this.settingsView.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));
        window.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
        const iframeContainer = document.getElementById("iframe-container");
        if (iframeContainer) {
            iframeContainer.addEventListener("focus", this.handleIframeFocus.bind(this));
        }
        const nextPageBtn = document.getElementById("next-page-btn");
        if (nextPageBtn) {
            nextPageBtn.addEventListener("click", this.handleNextPageClick.bind(this));
        }
        const prevPageBtn = document.getElementById("prev-page-btn");
        if (prevPageBtn) {
            prevPageBtn.addEventListener("click", this.handlePreviousPageClick.bind(this));
        }
        if (this.allowFullscreen && this.canFullscreen) {
            document.addEventListener("fullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("webkitfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("mozfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("MSFullscreenChange", this.toggleFullscreenIcon.bind(this));
        }
    }
    setupModalFocusTrap(modal, closeButton, lastFocusableElement) {
        // Trap keyboard focus in a modal dialog when it's displayed.
        const TAB_KEY = 9;
        // Going backwards from the close button sends you to the last focusable element.
        closeButton.addEventListener("keydown", (event) => {
            if (this.isDisplayed(modal)) {
                const tab = event.keyCode === TAB_KEY;
                const shift = !!event.shiftKey;
                if (tab && shift) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
        // Going forward from the last focusable element sends you to the close button.
        lastFocusableElement.addEventListener("keydown", (event) => {
            if (this.isDisplayed(modal)) {
                const tab = event.keyCode === TAB_KEY;
                const shift = !!event.shiftKey;
                if (tab && !shift) {
                    closeButton.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
    }
    handleKeyboardNavigation(event) {
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        if (this.settings.getSelectedView() === this.paginator) {
            if (event.keyCode === LEFT_ARROW) {
                this.handlePreviousPageClick(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.handleNextPageClick(event);
            }
        }
    }
    updateFont() {
        this.handleResize();
    }
    updateFontSize() {
        this.handleResize();
    }
    updateBookView() {
        const doNothing = () => { };
        if (this.settings.getSelectedView() === this.paginator) {
            const prevBtn = document.getElementById("prev-page-btn");
            if (prevBtn && prevBtn.classList.contains("hidden")) {
                prevBtn.classList.remove("hidden");
            }
            const nextBtn = document.getElementById("next-page-btn");
            if (nextBtn && nextBtn.classList.contains("hidden")) {
                nextBtn.classList.remove("hidden");
            }
            this.scrollingSuggestion.style.display = "block";
            document.body.onscroll = () => { };
            this.chapterTitle.style.display = "inline";
            this.chapterPosition.style.display = "inline";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onForwardSwipe = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftTap = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleNextPageClick.bind(this);
                this.eventHandler.onInternalLink = this.handleInternalLink.bind(this);
                this.eventHandler.onLeftArrow = this.handleKeyboardNavigation.bind(this);
                this.eventHandler.onRightArrow = this.handleKeyboardNavigation.bind(this);
            }
        }
        else if (this.settings.getSelectedView() === this.scroller) {
            this.scrollingSuggestion.style.display = "none";
            const prevBtn = document.getElementById("prev-page-btn");
            if (prevBtn && !prevBtn.classList.contains("hidden")) {
                prevBtn.classList.add("hidden");
            }
            const nextBtn = document.getElementById("next-page-btn");
            if (nextBtn && !nextBtn.classList.contains("hidden")) {
                nextBtn.classList.add("hidden");
            }
            this.chapterTitle.style.display = "none";
            this.chapterPosition.style.display = "none";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = doNothing;
                this.eventHandler.onForwardSwipe = doNothing;
                this.eventHandler.onLeftTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onLeftHover = doNothing;
                this.eventHandler.onRightHover = doNothing;
                this.eventHandler.onRemoveHover = doNothing;
                this.eventHandler.onInternalLink = doNothing;
                this.eventHandler.onLeftArrow = doNothing;
                this.eventHandler.onRightArrow = doNothing;
            }
        }
        this.updatePositionInfo();
        this.handleResize();
    }
    enableOffline() {
        if (this.cacher && this.cacher.getStatus() !== CacheStatus.Downloaded) {
            this.cacher.enable();
        }
    }
    updateOfflineCacheStatus(status) {
        const statusElement = this.settings.getOfflineStatusElement();
        let statusMessage = "";
        if (status === CacheStatus.Uncached) {
            statusMessage = "";
        }
        else if (status === CacheStatus.UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        }
        else if (status === CacheStatus.CheckingForUpdate) {
            statusMessage = "Checking for update.";
        }
        else if (status === CacheStatus.Downloading) {
            statusMessage = "Downloading...";
        }
        else if (status === CacheStatus.Downloaded) {
            statusMessage = "Downloaded for offline use";
        }
        else if (status === CacheStatus.Error) {
            statusMessage = "Error downloading for offline use";
        }
        statusElement.innerHTML = statusMessage;
    }
    loadManifest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const manifest = this.manifestUrl.href.endsWith(".json")
                    ? yield Manifest.getManifest(this.manifestUrl, this.store)
                    : yield EPub.getManifest(this.manifestUrl, this.store);
                console.log("IFrame looaded manifest:", manifest);
                const toc = manifest.toc;
                if (toc.length) {
                    this.contentsControl.className = "contents";
                    const createTOC = (parentElement, links) => {
                        const listElement = document.createElement("ol");
                        let lastLink = null;
                        for (const link of links) {
                            const listItemElement = document.createElement("li");
                            const linkElement = document.createElement("a");
                            const spanElement = document.createElement("span");
                            linkElement.tabIndex = -1;
                            let href = "";
                            if (link.href) {
                                href = new URL(link.href, this.manifestUrl.href).href;
                                linkElement.href = href;
                                linkElement.innerHTML = link.title || "";
                                listItemElement.appendChild(linkElement);
                            }
                            else {
                                spanElement.innerHTML = link.title || "";
                                listItemElement.appendChild(spanElement);
                            }
                            if (link.children && link.children.length > 0) {
                                createTOC(listItemElement, link.children);
                            }
                            listElement.appendChild(listItemElement);
                            lastLink = linkElement;
                        }
                        // Trap keyboard focus inside the TOC while it's open.
                        if (lastLink) {
                            this.setupModalFocusTrap(this.tocView, this.contentsControl, lastLink);
                        }
                        listElement.addEventListener("click", (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (event.target &&
                                event.target.tagName.toLowerCase() === "a") {
                                let linkElement = event.target;
                                if (linkElement.className.indexOf("active") !== -1) {
                                    // This TOC item is already loaded. Hide the TOC
                                    // but don't navigate.
                                    this.hideTOC();
                                }
                                else {
                                    // Set focus back to the contents toggle button so screen readers
                                    // don't get stuck on a hidden link.
                                    this.contentsControl.focus();
                                    this.navigate({
                                        resource: linkElement.href,
                                        position: 0,
                                    });
                                }
                            }
                        });
                        parentElement.appendChild(listElement);
                    };
                    createTOC(this.tocView, toc);
                }
                else {
                    this.contentsControl.parentElement.style.display = "none";
                }
                if (this.upLinkConfig && this.upLinkConfig.url) {
                    const upLabel = this.upLinkConfig.label || "";
                    const upAriaLabel = this.upLinkConfig.ariaLabel || upLabel;
                    const upHTML = upLinkTemplate(upLabel, upAriaLabel);
                    const upParent = document.createElement("li");
                    upParent.classList.add("uplink-wrapper");
                    upParent.innerHTML = upHTML;
                    this.links.insertBefore(upParent, this.links.firstChild);
                    this.upLink = HTMLUtilities.findRequiredElement(this.links, "a[rel=up]");
                    this.upLink.addEventListener("click", this.handleClick, false);
                }
                if (this.allowFullscreen && this.canFullscreen) {
                    const fullscreenHTML = `<button id="fullscreen-control" class="fullscreen" aria-labelledby="fullScreen-label" aria-hidden="false">${IconLib.icons.expand} ${IconLib.icons.minimize}<label id="fullscreen-label" class="setting-text">Toggle Fullscreen</label></button>`;
                    const fullscreenParent = document.createElement("li");
                    fullscreenParent.innerHTML = fullscreenHTML;
                    this.links.appendChild(fullscreenParent);
                    this.fullscreen = HTMLUtilities.findRequiredElement(this.links, "#fullscreen-control");
                    this.fullscreen.addEventListener("click", this.toggleFullscreen.bind(this));
                }
                let lastReadingPosition = null;
                if (this.annotator) {
                    lastReadingPosition = (yield this.annotator.getLastReadingPosition());
                }
                const startLink = manifest.getStartLink();
                let startUrl = null;
                if (startLink && startLink.href) {
                    startUrl = new URL(startLink.href, this.manifestUrl.href).href;
                }
                if (lastReadingPosition) {
                    this.navigate(lastReadingPosition);
                }
                else if (startUrl) {
                    const position = {
                        resource: startUrl,
                        position: 0,
                    };
                    this.navigate(position);
                }
                return new Promise((resolve) => resolve());
            }
            catch (err) {
                console.log("something went wrong", err);
                this.abortOnError();
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    handleIFrameLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorMessage.style.display = "none";
            this.showLoadingMessageAfterDelay();
            try {
                this.hideTOC();
                let bookViewPosition = 0;
                if (this.newPosition) {
                    bookViewPosition = this.newPosition.position;
                    this.newPosition = null;
                }
                this.updateFont();
                this.updateFontSize();
                this.updateBookView();
                this.settings.getSelectedFont().start();
                this.settings.getSelectedTheme().start();
                this.settings.getSelectedView().start(bookViewPosition);
                if (this.newElementId) {
                    this.settings.getSelectedView().goToElement(this.newElementId);
                    this.newElementId = null;
                }
                let currentLocation = this.iframe.src;
                if (this.iframe.contentDocument &&
                    this.iframe.contentDocument.location &&
                    this.iframe.contentDocument.location.href) {
                    currentLocation = this.iframe.contentDocument.location.href;
                }
                if (currentLocation.indexOf("#") !== -1) {
                    // Letting the iframe load the anchor itself doesn't always work.
                    // For example, with CSS column-based pagination, you can end up
                    // between two columns, and we can't reset the position in some
                    // browsers. Instead, we grab the element id and reload the iframe
                    // without it, then let the view figure out how to go to that element
                    // on the next load event.
                    const elementId = currentLocation.slice(currentLocation.indexOf("#") + 1);
                    // Set the element to go to the next time the iframe loads.
                    this.newElementId = elementId;
                    // Reload the iframe without the anchor.
                    this.iframe.src = currentLocation.slice(0, currentLocation.indexOf("#"));
                    return new Promise((resolve) => resolve());
                }
                this.updatePositionInfo();
                const manifest = yield Manifest.getManifest(this.manifestUrl, this.store);
                const previous = manifest.getPreviousSpineItem(currentLocation);
                if (previous && previous.href) {
                    this.previousChapterLink.href = new URL(previous.href, this.manifestUrl.href).href;
                    this.previousChapterLink.className = "";
                }
                else {
                    this.previousChapterLink.removeAttribute("href");
                    this.previousChapterLink.className = "disabled";
                    // this.handleRemoveHover();
                }
                const next = manifest.getNextSpineItem(currentLocation);
                if (next && next.href) {
                    this.nextChapterLink.href = new URL(next.href, this.manifestUrl.href).href;
                    this.nextChapterLink.className = "";
                }
                else {
                    this.nextChapterLink.removeAttribute("href");
                    this.nextChapterLink.className = "disabled";
                    // this.handleRemoveHover();
                }
                this.setActiveTOCItem(currentLocation);
                if (manifest.metadata.title) {
                    this.bookTitle.innerHTML = manifest.metadata.title;
                }
                let chapterTitle;
                const spineItem = manifest.getSpineItem(currentLocation);
                if (spineItem !== null) {
                    chapterTitle = spineItem.title;
                }
                if (!chapterTitle) {
                    const tocItem = manifest.getTOCItem(currentLocation);
                    if (tocItem !== null && tocItem.title) {
                        chapterTitle = tocItem.title;
                    }
                }
                if (chapterTitle) {
                    this.chapterTitle.innerHTML = "(" + chapterTitle + ")";
                }
                else {
                    this.chapterTitle.innerHTML = "(Current Chapter)";
                }
                if (this.eventHandler) {
                    this.eventHandler.setupEvents(this.iframe.contentDocument);
                }
                if (this.annotator) {
                    yield this.saveCurrentReadingPosition();
                }
                this.hideLoadingMessage();
                this.showIframeContents();
                Object.defineProperty(this.iframe.contentWindow.navigator, "epubReadingSystem", { value: epubReadingSystem, writable: false });
                return new Promise((resolve) => resolve());
            }
            catch (err) {
                console.log("oops", err);
                this.abortOnError();
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    abortOnError() {
        this.errorMessage.style.display = "block";
        if (this.isLoading) {
            this.hideLoadingMessage();
        }
    }
    tryAgain() {
        this.iframe.src = this.iframe.src;
        this.enableOffline();
    }
    handleClick() {
        window.parent.postMessage("backButtonClicked", "*");
    }
    goBack() {
        window.history.back();
    }
    isDisplayed(element) {
        return element.className.indexOf(" active") !== -1;
    }
    showElement(element, control) {
        element.className = element.className.replace(" inactive", "");
        if (element.className.indexOf(" active") === -1) {
            element.className += " active";
        }
        element.setAttribute("aria-hidden", "false");
        if (control) {
            control.setAttribute("aria-expanded", "true");
            const openIcon = control.querySelector(".icon.open");
            if (openIcon &&
                (openIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                const newIconClass = (openIcon.getAttribute("class") || "") + " inactive-icon";
                openIcon.setAttribute("class", newIconClass);
            }
            const closeIcon = control.querySelector(".icon.close");
            if (closeIcon) {
                const newIconClass = (closeIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Add buttons and links in the element to the tab order.
        const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        const links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (const button of buttons) {
            button.tabIndex = 0;
        }
        for (const link of links) {
            link.tabIndex = 0;
        }
    }
    hideElement(element, control) {
        element.className = element.className.replace(" active", "");
        if (element.className.indexOf(" inactive") === -1) {
            element.className += " inactive";
        }
        element.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-expanded", "false");
            const openIcon = control.querySelector(".icon.open");
            if (openIcon) {
                const newIconClass = (openIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                openIcon.setAttribute("class", newIconClass);
            }
            const closeIcon = control.querySelector(".icon.close");
            if (closeIcon &&
                (closeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                const newIconClass = (closeIcon.getAttribute("class") || "") + " inactive-icon";
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Remove buttons and links in the element from the tab order.
        const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        const links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (const button of buttons) {
            button.tabIndex = -1;
        }
        for (const link of links) {
            link.tabIndex = -1;
        }
    }
    showModal(modal, control) {
        // Hide the rest of the page for screen readers.
        this.pageContainer.setAttribute("aria-hidden", "true");
        this.iframe.setAttribute("aria-hidden", "true");
        this.scrollingSuggestion.setAttribute("aria-hidden", "true");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "true");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "true");
        }
        this.contentsControl.setAttribute("aria-hidden", "true");
        this.settingsControl.setAttribute("aria-hidden", "true");
        this.linksBottom.setAttribute("aria-hidden", "true");
        this.loadingMessage.setAttribute("aria-hidden", "true");
        this.errorMessage.setAttribute("aria-hidden", "true");
        this.infoTop.setAttribute("aria-hidden", "true");
        this.infoBottom.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-hidden", "false");
        }
        this.showElement(modal, control);
    }
    hideModal(modal, control) {
        // Restore the page for screen readers.
        this.pageContainer.setAttribute("aria-hidden", "false");
        this.iframe.setAttribute("aria-hidden", "false");
        this.scrollingSuggestion.setAttribute("aria-hidden", "false");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "false");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "false");
        }
        this.contentsControl.setAttribute("aria-hidden", "false");
        this.settingsControl.setAttribute("aria-hidden", "false");
        this.linksBottom.setAttribute("aria-hidden", "false");
        this.loadingMessage.setAttribute("aria-hidden", "false");
        this.errorMessage.setAttribute("aria-hidden", "false");
        this.infoTop.setAttribute("aria-hidden", "false");
        this.infoBottom.setAttribute("aria-hidden", "false");
        this.hideElement(modal, control);
    }
    toggleFullscreenIcon() {
        if (this.fullscreen) {
            const activeIcon = this.fullscreen.querySelector(".icon.active-icon");
            const inactiveIcon = this.fullscreen.querySelector(".icon.inactive-icon");
            if (activeIcon &&
                (activeIcon.getAttribute("class") || "").indexOf(" inactive-icon") ===
                    -1) {
                const newIconClass = "icon inactive-icon";
                activeIcon.setAttribute("class", newIconClass);
            }
            if (inactiveIcon) {
                const newIconClass = "icon active-icon";
                inactiveIcon.setAttribute("class", newIconClass);
            }
        }
    }
    toggleFullscreen() {
        if (this.fullscreen) {
            const doc = document;
            const docEl = document.documentElement;
            const requestFullScreen = docEl.requestFullscreen ||
                docEl.mozRequestFullScreen ||
                docEl.webkitRequestFullScreen ||
                docEl.msRequestFullscreen;
            const cancelFullScreen = doc.exitFullscreen ||
                doc.mozCancelFullScreen ||
                doc.webkitExitFullscreen ||
                doc.msExitFullscreen;
            if (!doc.fullscreenElement &&
                !doc.mozFullScreenElement &&
                !doc.webkitFullscreenElement &&
                !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    }
    // private toggleDisplay(element: HTMLDivElement | HTMLUListElement, control?: HTMLAnchorElement | HTMLButtonElement): void {
    //     if (!this.isDisplayed(element)) {
    //         this.showElement(element, control);
    //     } else {
    //         this.hideElement(element, control);
    //     }
    // }
    toggleModal(modal, control) {
        if (!this.isDisplayed(modal)) {
            this.showModal(modal, control);
        }
        else {
            this.hideModal(modal, control);
        }
    }
    handleToggleLinksClick(event) {
        this.hideTOC();
        this.hideSettings();
        // this.toggleDisplay(this.links, this.menuControl);
        // if (this.settings.getSelectedView() === this.scroller) {
        //     if (!this.scroller.atBottom()) {
        //         this.toggleDisplay(this.linksBottom);
        //     }
        // }
        event.preventDefault();
        event.stopPropagation();
    }
    handlePreviousPageClick(event) {
        if (this.paginator) {
            if (this.paginator.onFirstPage()) {
                if (this.previousChapterLink.hasAttribute("href")) {
                    const position = {
                        resource: this.previousChapterLink.href,
                        position: 1,
                    };
                    this.navigate(position);
                }
            }
            else {
                this.paginator.goToPreviousPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleNextPageClick(event) {
        if (this.paginator) {
            if (this.paginator.onLastPage()) {
                if (this.nextChapterLink.hasAttribute("href")) {
                    const position = {
                        resource: this.nextChapterLink.href,
                        position: 0,
                    };
                    this.navigate(position);
                }
            }
            else {
                this.paginator.goToNextPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    // private handleLeftHover(): void {
    //     if (this.paginator) {
    //         if (this.paginator.onFirstPage() && !this.previousChapterLink.hasAttribute("href")) {
    //             this.iframe.className = "";
    //         } else {
    //             this.iframe.className = "left-hover";
    //         }
    //     }
    // }
    // private handleRightHover(): void {
    //     if (this.paginator) {
    //         if (this.paginator.onLastPage() && !this.nextChapterLink.hasAttribute("href")) {
    //             this.iframe.className = "";
    //         } else {
    //             this.iframe.className = "right-hover";
    //         }
    //     }
    // }
    // private handleRemoveHover(): void {
    //     this.iframe.className = "";
    // }
    handleInternalLink(event) {
        const element = event.target;
        let currentLocation = this.iframe.src.split("#")[0];
        if (this.iframe.contentDocument &&
            this.iframe.contentDocument.location &&
            this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href.split("#")[0];
        }
        if (element && element.tagName.toLowerCase() === "a") {
            if (element.href.split("#")[0] === currentLocation) {
                const elementId = element.href.split("#")[1];
                this.settings.getSelectedView().goToElement(elementId, true);
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    handleIframeFocus() {
        const body = HTMLUtilities.findRequiredIframeElement(this.iframe.contentDocument, "body");
        const iframeContainer = document.getElementById("iframe-container");
        if (iframeContainer) {
            iframeContainer.blur();
        }
        body.focus();
    }
    handleResize() {
        const selectedView = this.settings.getSelectedView();
        const oldPosition = selectedView.getCurrentPosition();
        const fontSize = this.settings.getSelectedFontSize();
        const body = HTMLUtilities.findRequiredIframeElement(this.iframe.contentDocument, "body");
        body.style.fontSize = fontSize;
        body.style.lineHeight = "1.5";
        // const fontSizeNumber = parseInt(fontSize.slice(0, -2));
        // let sideMargin = fontSizeNumber * 2;
        // if (BrowserUtilities.getWidth() > fontSizeNumber * 45) {
        //     const extraMargin = Math.floor((BrowserUtilities.getWidth() - fontSizeNumber * 40) / 2);
        //     sideMargin = sideMargin + extraMargin;
        // }
        // // if (this.paginator) {
        //     this.paginator.sideMargin = sideMargin;
        // }
        // if (this.scroller) {
        //     this.scroller.sideMargin = sideMargin;
        // }
        // If the links are hidden, show them temporarily
        // to determine the top and bottom heights.
        // const linksHidden = !this.isDisplayed(this.links);
        // if (linksHidden) {
        //     this.toggleDisplay(this.links);
        // }
        const topHeight = this.links.clientHeight;
        this.infoTop.style.height = topHeight + "px";
        // if (linksHidden) {
        //     this.toggleDisplay(this.links);
        // }
        // const linksBottomHidden = !this.isDisplayed(this.linksBottom);
        // if (linksBottomHidden) {
        //     this.toggleDisplay(this.linksBottom);
        // }
        const bottomHeight = this.linksBottom.clientHeight;
        this.infoBottom.style.height = bottomHeight + "px";
        // if (linksBottomHidden) {
        //     this.toggleDisplay(this.linksBottom);
        // }
        selectedView.goToPosition(oldPosition);
        this.updatePositionInfo();
    }
    updatePositionInfo() {
        if (this.settings.getSelectedView() === this.paginator) {
            const currentPage = Math.round(this.paginator.getCurrentPage());
            const pageCount = Math.round(this.paginator.getPageCount());
            this.chapterPosition.innerHTML =
                "Page " + currentPage + " of " + pageCount;
        }
        else {
            this.chapterPosition.innerHTML = "";
        }
    }
    handlePreviousChapterClick(event) {
        if (this.previousChapterLink.hasAttribute("href")) {
            const position = {
                resource: this.previousChapterLink.href,
                position: 0,
            };
            this.navigate(position);
        }
        event.preventDefault();
        event.stopPropagation();
    }
    handleNextChapterClick(event) {
        if (this.nextChapterLink.hasAttribute("href")) {
            const position = {
                resource: this.nextChapterLink.href,
                position: 0,
            };
            this.navigate(position);
        }
        event.preventDefault();
        event.stopPropagation();
    }
    handleContentsClick(event) {
        this.hideSettings();
        this.toggleModal(this.tocView, this.contentsControl);
        // While the TOC is displayed, prevent scrolling in the book.
        if (this.settings.getSelectedView() === this.scroller) {
            if (this.isDisplayed(this.tocView)) {
                document.body.style.overflow = "hidden";
            }
            else {
                document.body.style.overflow = "auto";
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }
    hideTOC() {
        this.hideModal(this.tocView, this.contentsControl);
        if (this.settings.getSelectedView() === this.scroller) {
            document.body.style.overflow = "auto";
        }
    }
    hideTOCOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.tocView) && event.keyCode === ESCAPE_KEY) {
            this.hideTOC();
        }
    }
    setActiveTOCItem(resource) {
        const allItems = Array.prototype.slice.call(this.tocView.querySelectorAll("li > a"));
        for (const item of allItems) {
            item.className = "";
        }
        const activeItem = this.tocView.querySelector('li > a[href^="' + resource + '"]');
        if (activeItem) {
            activeItem.className = "active";
        }
    }
    handleSettingsClick(event) {
        this.hideTOC();
        this.toggleModal(this.settingsView, this.settingsControl);
        event.preventDefault();
        event.stopPropagation();
    }
    hideSettings() {
        this.hideModal(this.settingsView, this.settingsControl);
    }
    hideSettingsOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.settingsView) && event.keyCode === ESCAPE_KEY) {
            this.hideSettings();
        }
    }
    navigate(readingPosition) {
        this.hideIframeContents();
        this.showLoadingMessageAfterDelay();
        this.newPosition = readingPosition;
        if (readingPosition.resource.indexOf("#") === -1) {
            this.iframe.src = readingPosition.resource;
        }
        else {
            // We're navigating to an anchor within the resource,
            // rather than the resource itself. Go to the resource
            // first, then go to the anchor.
            this.newElementId = readingPosition.resource.slice(readingPosition.resource.indexOf("#") + 1);
            const newResource = readingPosition.resource.slice(0, readingPosition.resource.indexOf("#"));
            if (newResource === this.iframe.src) {
                // The resource isn't changing, but handle it like a new
                // iframe load to hide the menus and popups and go to the
                // new element.
                this.handleIFrameLoad();
            }
            else {
                this.iframe.src = newResource;
            }
        }
    }
    showIframeContents() {
        this.isBeingStyled = false;
        // We set a timeOut so that settings can be applied when opacity is still 0
        setTimeout(() => {
            if (!this.isBeingStyled) {
                this.iframe.style.opacity = "1";
            }
        }, 150);
    }
    showLoadingMessageAfterDelay() {
        this.isLoading = true;
        setTimeout(() => {
            if (this.isLoading) {
                this.loadingMessage.style.display = "block";
                this.loadingMessage.classList.add("is-loading");
            }
        }, 200);
    }
    hideIframeContents() {
        this.isBeingStyled = true;
        this.iframe.style.opacity = "0";
    }
    hideLoadingMessage() {
        this.isLoading = false;
        this.loadingMessage.style.display = "none";
        this.loadingMessage.classList.remove("is-loading");
    }
    saveCurrentReadingPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.annotator) {
                const resource = this.iframe.src;
                const position = this.settings.getSelectedView().getCurrentPosition();
                return this.annotator.saveLastReadingPosition({
                    resource: resource,
                    position: position,
                });
            }
            else {
                return new Promise((resolve) => resolve());
            }
        });
    }
}
//# sourceMappingURL=IFrameNavigator.js.map