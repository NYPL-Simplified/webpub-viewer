/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BookSettings.ts":
/*!*****************************!*\
  !*** ./src/BookSettings.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
const IconLib = __importStar(__webpack_require__(/*! ./IconLib */ "./src/IconLib.ts"));
const template = (sections) => `
    <ul class="settings-menu" role="menu">
        ${sections}
    </ul>
`;
const sectionTemplate = (options) => `
    <li><ul class="settings-options">
        ${options}
    </ul></li>
`;
const optionTemplate = (liClassName, buttonClassName, label, role, svgIcon, buttonId) => `
    <li class='${liClassName}'><button id='${buttonId}' class='${buttonClassName}' role='${role}' tabindex=-1>${label}${svgIcon}</button></li>
`;
const offlineTemplate = `
    <li>
        <div class='offline-status'></div>
    </li>
`;
class BookSettings {
    constructor(store, bookFonts, fontSizes, bookThemes, bookViews) {
        this.fontChangeCallback = () => { };
        this.fontSizeChangeCallback = () => { };
        this.themeChangeCallback = () => { };
        this.viewChangeCallback = () => { };
        this.store = store;
        this.bookFonts = bookFonts;
        this.fontSizes = fontSizes;
        this.bookThemes = bookThemes;
        this.bookViews = bookViews;
    }
    static create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const fontSizes = config.fontSizesInPixels.map(fontSize => fontSize + "px");
            const settings = new this(config.store, config.bookFonts, fontSizes, config.bookThemes, config.bookViews);
            yield settings.initializeSelections(config.defaultFontSizeInPixels ? config.defaultFontSizeInPixels + "px" : undefined);
            return settings;
        });
    }
    initializeSelections(defaultFontSize) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bookFonts.length >= 1) {
                let selectedFont = this.bookFonts[0];
                const selectedFontName = yield this.store.get(BookSettings.SELECTED_FONT_KEY);
                if (selectedFontName) {
                    for (const bookFont of this.bookFonts) {
                        if (bookFont.name === selectedFontName) {
                            selectedFont = bookFont;
                            break;
                        }
                    }
                }
                this.selectedFont = selectedFont;
            }
            if (this.fontSizes.length >= 1) {
                // First, check if the user has previously set a font size.
                let selectedFontSize = yield this.store.get(BookSettings.SELECTED_FONT_SIZE_KEY);
                let selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                // If not, or the user selected a size that's no longer an option, is there a default font size?
                if ((!selectedFontSize || !selectedFontSizeIsAvailable) && defaultFontSize) {
                    selectedFontSize = defaultFontSize;
                    selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                }
                // If there's no selection and no default, pick a font size in the middle of the options.
                if (!selectedFontSize || !selectedFontSizeIsAvailable) {
                    const averageFontSizeIndex = Math.floor(this.fontSizes.length / 2);
                    selectedFontSize = this.fontSizes[averageFontSizeIndex];
                }
                this.selectedFontSize = selectedFontSize;
            }
            if (this.bookThemes.length >= 1) {
                let selectedTheme = this.bookThemes[0];
                const selectedThemeName = yield this.store.get(BookSettings.SELECTED_THEME_KEY);
                if (selectedThemeName) {
                    for (const bookTheme of this.bookThemes) {
                        if (bookTheme.name === selectedThemeName) {
                            selectedTheme = bookTheme;
                            break;
                        }
                    }
                }
                this.selectedTheme = selectedTheme;
            }
            if (this.bookViews.length >= 1) {
                let selectedView = this.bookViews[0];
                const selectedViewName = yield this.store.get(BookSettings.SELECTED_VIEW_KEY);
                if (selectedViewName) {
                    for (const bookView of this.bookViews) {
                        if (bookView.name === selectedViewName) {
                            selectedView = bookView;
                            break;
                        }
                    }
                }
                this.selectedView = selectedView;
            }
        });
    }
    renderControls(element) {
        const sections = [];
        if (this.bookFonts.length > 1) {
            const fontOptions = this.bookFonts.map(bookFont => optionTemplate("reading-style", bookFont.name, bookFont.label, "menuitem", IconLib.icons.checkDupe, bookFont.label));
            sections.push(sectionTemplate(fontOptions.join("")));
        }
        if (this.fontSizes.length > 1) {
            const fontSizeOptions = optionTemplate("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + optionTemplate("font-setting", "increase", "A+", "menuitem", "", "increase-font");
            sections.push(sectionTemplate(fontSizeOptions));
        }
        if (this.bookThemes.length > 1) {
            const themeOptions = this.bookThemes.map(bookTheme => optionTemplate("reading-theme", bookTheme.name, bookTheme.label, "menuitem", IconLib.icons.checkDupe, bookTheme.label));
            sections.push(sectionTemplate(themeOptions.join("")));
        }
        if (this.bookViews.length > 1) {
            const viewOptions = this.bookViews.map(bookView => optionTemplate("reading-style", bookView.name, bookView.label, "menuitem", IconLib.icons.checkDupe, bookView.label));
            sections.push(sectionTemplate(viewOptions.join("")));
        }
        sections.push(offlineTemplate);
        element.innerHTML = template(sections.join(""));
        this.fontButtons = {};
        if (this.bookFonts.length > 1) {
            for (const bookFont of this.bookFonts) {
                this.fontButtons[bookFont.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookFont.name + "]");
            }
            this.updateFontButtons();
        }
        this.fontSizeButtons = {};
        if (this.fontSizes.length > 1) {
            for (const fontSizeName of ["decrease", "increase"]) {
                this.fontSizeButtons[fontSizeName] = HTMLUtilities.findRequiredElement(element, "button[class=" + fontSizeName + "]");
            }
            this.updateFontSizeButtons();
        }
        this.themeButtons = {};
        if (this.bookThemes.length > 1) {
            for (const bookTheme of this.bookThemes) {
                this.themeButtons[bookTheme.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookTheme.name + "]");
            }
            this.updateThemeButtons();
        }
        this.viewButtons = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewButtons[bookView.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookView.name + "]");
            }
            this.updateViewButtons();
        }
        this.offlineStatusElement = HTMLUtilities.findRequiredElement(element, 'div[class="offline-status"]');
        this.setupEvents();
        // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
        HTMLUtilities.findRequiredElement(element, "ul").addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }
    onFontChange(callback) {
        this.fontChangeCallback = callback;
    }
    onFontSizeChange(callback) {
        this.fontSizeChangeCallback = callback;
    }
    onThemeChange(callback) {
        this.themeChangeCallback = callback;
    }
    onViewChange(callback) {
        this.viewChangeCallback = callback;
    }
    setupEvents() {
        for (const font of this.bookFonts) {
            const button = this.fontButtons[font.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    this.selectedFont.stop();
                    font.start();
                    this.selectedFont = font;
                    this.updateFontButtons();
                    this.storeSelectedFont(font);
                    this.fontChangeCallback();
                    event.preventDefault();
                });
            }
        }
        if (this.fontSizes.length > 1) {
            this.fontSizeButtons["decrease"].addEventListener("click", (event) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex > 0) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex - 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
            this.fontSizeButtons["increase"].addEventListener("click", (event) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex < this.fontSizes.length - 1) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex + 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
        }
        for (const theme of this.bookThemes) {
            const button = this.themeButtons[theme.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    this.selectedTheme.stop();
                    theme.start();
                    this.selectedTheme = theme;
                    this.updateThemeButtons();
                    this.storeSelectedTheme(theme);
                    this.themeChangeCallback();
                    event.preventDefault();
                });
            }
        }
        for (const view of this.bookViews) {
            const button = this.viewButtons[view.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    const position = this.selectedView.getCurrentPosition();
                    this.selectedView.stop();
                    view.start(position);
                    this.selectedView = view;
                    this.updateViewButtons();
                    this.storeSelectedView(view);
                    this.viewChangeCallback();
                    event.preventDefault();
                });
            }
        }
    }
    updateFontButtons() {
        for (const font of this.bookFonts) {
            if (font === this.selectedFont) {
                this.fontButtons[font.name].className = font.name + " active";
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font enabled");
            }
            else {
                this.fontButtons[font.name].className = font.name;
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font disabled");
            }
        }
    }
    updateFontSizeButtons() {
        const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
        if (currentFontSizeIndex === 0) {
            this.fontSizeButtons["decrease"].className = "decrease disabled";
        }
        else {
            this.fontSizeButtons["decrease"].className = "decrease";
        }
        if (currentFontSizeIndex === this.fontSizes.length - 1) {
            this.fontSizeButtons["increase"].className = "increase disabled";
        }
        else {
            this.fontSizeButtons["increase"].className = "increase";
        }
    }
    updateThemeButtons() {
        for (const theme of this.bookThemes) {
            if (theme === this.selectedTheme) {
                this.themeButtons[theme.name].className = theme.name + " active";
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode enabled");
            }
            else {
                this.themeButtons[theme.name].className = theme.name;
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode disabled");
            }
        }
    }
    updateViewButtons() {
        for (const view of this.bookViews) {
            if (view === this.selectedView) {
                this.viewButtons[view.name].className = view.name + " active";
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode enabled");
            }
            else {
                this.viewButtons[view.name].className = view.name;
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode disabled");
            }
        }
    }
    getSelectedFont() {
        return this.selectedFont;
    }
    getSelectedFontSize() {
        return this.selectedFontSize;
    }
    getSelectedTheme() {
        return this.selectedTheme;
    }
    getSelectedView() {
        return this.selectedView;
    }
    getOfflineStatusElement() {
        return this.offlineStatusElement;
    }
    storeSelectedFont(font) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_FONT_KEY, font.name);
        });
    }
    storeSelectedFontSize(fontSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_FONT_SIZE_KEY, fontSize);
        });
    }
    storeSelectedTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_THEME_KEY, theme.name);
        });
    }
    storeSelectedView(view) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name);
        });
    }
}
exports.default = BookSettings;
BookSettings.SELECTED_FONT_KEY = "settings-selected-font";
BookSettings.SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
BookSettings.SELECTED_THEME_KEY = "settings-selected-theme";
BookSettings.SELECTED_VIEW_KEY = "settings-selected-view";
;


/***/ }),

/***/ "./src/BrowserUtilities.ts":
/*!*********************************!*\
  !*** ./src/BrowserUtilities.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isZoomed = exports.getHeight = exports.getWidth = void 0;
/** Returns the current width of the document. */
function getWidth() {
    return document.documentElement.clientWidth;
}
exports.getWidth = getWidth;
/** Returns the current height of the document. */
function getHeight() {
    return document.documentElement.clientHeight;
}
exports.getHeight = getHeight;
/** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
function isZoomed() {
    return (getWidth() !== window.innerWidth);
}
exports.isZoomed = isZoomed;


/***/ }),

/***/ "./src/Cacher.ts":
/*!***********************!*\
  !*** ./src/Cacher.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStatus = void 0;
var CacheStatus;
(function (CacheStatus) {
    /** The book has not been cached. */
    CacheStatus[CacheStatus["Uncached"] = 0] = "Uncached";
    /** There is a new version available (Application Cache only - refresh the page to update). */
    CacheStatus[CacheStatus["UpdateAvailable"] = 1] = "UpdateAvailable";
    /** The app is checking for a new version (Application Cache only). */
    CacheStatus[CacheStatus["CheckingForUpdate"] = 2] = "CheckingForUpdate";
    /** The cache is downloading. */
    CacheStatus[CacheStatus["Downloading"] = 3] = "Downloading";
    /** The cache is fully downloaded and the book is available offline. */
    CacheStatus[CacheStatus["Downloaded"] = 4] = "Downloaded";
    /** There was an error downloading the cache, and the book is not available offline. */
    CacheStatus[CacheStatus["Error"] = 5] = "Error";
})(CacheStatus = exports.CacheStatus || (exports.CacheStatus = {}));


/***/ }),

/***/ "./src/ColumnsPaginatedBookView.ts":
/*!*****************************************!*\
  !*** ./src/ColumnsPaginatedBookView.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
// import * as BrowserUtilities from "./BrowserUtilities";
class ColumnsPaginatedBookView {
    constructor() {
        this.name = "columns-paginated-view";
        this.label = "Paginated";
        this.sideMargin = 0;
        this.height = 0;
        this.hasFixedScrollWidth = false;
    }
    start(position) {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        body.style.webkitColumnCount = "1";
        body.style.MozColumnCount = "1";
        body.style.columnCount = "1";
        body.style.webkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.columnFill = "auto";
        body.style.overflow = "hidden";
        body.style.position = "relative";
        body.style.webkitFontSmoothing = "subpixel-antialiased";
        this.setSize();
        const viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        const head = HTMLUtilities.findIframeElement(this.bookElement.contentDocument, "head");
        if (head) {
            head.appendChild(viewportElement);
        }
        this.checkForFixedScrollWidth();
        this.goToPosition(position);
        // This is delayed to prevent a bug in iOS 10.3 that causes
        // the top links to be displayed in the middle of the page.
        setTimeout(() => {
            document.body.style.overflow = "hidden";
            // This prevents overscroll/bouncing on iOS.
            document.body.style.position = "fixed";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.top = "0";
            document.body.style.bottom = "0";
        }, 0);
    }
    checkForFixedScrollWidth() {
        // Determine if the scroll width changes when the left position
        // changes. This differs across browsers and sometimes across
        // books in the same browser.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        const originalLeft = (body.style.left || "0px").slice(0, -2);
        const originalScrollWidth = body.scrollWidth;
        body.style.left = (originalLeft - 1) + "px";
        this.hasFixedScrollWidth = (body.scrollWidth === originalScrollWidth);
        body.style.left = originalLeft + "px";
    }
    // Get available width for iframe container to sit within
    getAvailableWidth() {
        const prevBtn = document.getElementById('prev-page-btn');
        let prevBtnWidth = 0;
        if (prevBtn) {
            const rect = prevBtn.getBoundingClientRect();
            prevBtnWidth = rect.width;
        }
        const nextBtn = document.getElementById('next-page-btn');
        let nextBtnWidth = 0;
        if (nextBtn) {
            const rect = nextBtn.getBoundingClientRect();
            nextBtnWidth = rect.width;
        }
        return window.innerWidth - prevBtnWidth - nextBtnWidth;
    }
    getAvailableHeight() {
        const topBar = document.getElementById('top-control-bar');
        let topHeight = 0;
        if (topBar) {
            const topRect = topBar.getBoundingClientRect();
            topHeight = topRect.height;
        }
        const bottomBar = document.getElementById('bottom-control-bar');
        let bottomHeight = 0;
        if (bottomBar) {
            const bottomRect = bottomBar.getBoundingClientRect();
            bottomHeight = bottomRect.height;
        }
        return window.innerHeight - topHeight - bottomHeight;
    }
    setSize() {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        const width = this.getAvailableWidth() + "px";
        body.style.columnWidth = width;
        body.style.webkitColumnWidth = width;
        body.style.MozColumnWidth = width;
        body.style.columnGap = this.sideMargin * 2 + "px";
        body.style.webkitColumnGap = this.sideMargin * 2 + "px";
        body.style.MozColumnGap = this.sideMargin * 2 + "px";
        body.style.height = this.getAvailableHeight() + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";
        this.bookElement.contentDocument.documentElement.style.height = this.getAvailableHeight() + "px";
        this.bookElement.style.height = this.getAvailableHeight() + "px";
        this.bookElement.style.width = width;
        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.maxWidth = "100%";
            // Determine how much vertical space there is for the image.
            let nextElement = image;
            let totalMargins = 0;
            while (nextElement !== body) {
                const computedStyle = window.getComputedStyle(nextElement);
                if (computedStyle.marginTop) {
                    totalMargins += parseInt(computedStyle.marginTop.slice(0, -2), 10);
                }
                if (computedStyle.marginBottom) {
                    totalMargins += parseInt(computedStyle.marginBottom.slice(0, -2), 10);
                }
                nextElement = nextElement.parentElement;
            }
            image.style.maxHeight = (this.getAvailableHeight() - totalMargins) + "px";
            // Without this, an image at the end of a resource can end up
            // with an extra empty column after it.
            image.style.verticalAlign = "top";
        }
    }
    stop() {
        document.body.style.overflow = "auto";
        document.body.style.position = "static";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.top = "";
        document.body.style.bottom = "";
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        body.style.columnCount = "";
        body.style.webkitColumnCount = "";
        body.style.MozColumnCount = "";
        body.style.columnGap = "";
        body.style.webkitColumnGap = "";
        body.style.MozColumnGap = "";
        body.style.columnFill = "";
        body.style.webkitColumnFill = "";
        body.style.MozColumnFill = "";
        body.style.overflow = "";
        body.style.position = "";
        body.style.webkitFontSmoothing = "";
        body.style.columnWidth = "";
        body.style.webkitColumnWidth = "";
        body.style.MozColumnWidth = "";
        body.style.height = "";
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        body.style.marginTop = "";
        body.style.marginBottom = "";
        this.bookElement.contentDocument.documentElement.style.height = "";
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.maxWidth = "";
            image.style.maxHeight = "";
            image.style.display = "";
            image.style.marginLeft = "";
            image.style.marginRight = "";
        }
    }
    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    getLeftColumnsWidth() {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            return body.scrollLeft;
        }
        return -(body.style.left || "0px").slice(0, -2);
    }
    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    getRightColumnsWidth() {
        // scrollWidth includes the column in the iframe viewport as well as
        // columns to the right.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        const scrollWidth = body.scrollWidth;
        const width = this.getColumnWidth();
        let rightWidth = scrollWidth + this.sideMargin - width;
        if (this.hasFixedScrollWidth) {
            // In some browsers (IE and Firefox with certain books), 
            // scrollWidth doesn't change when some columns
            // are off to the left, so we need to subtract them.
            const leftWidth = this.getLeftColumnsWidth();
            rightWidth = Math.max(0, rightWidth - leftWidth);
        }
        if (rightWidth === this.sideMargin) {
            return 0;
        }
        else {
            return rightWidth;
        }
    }
    /** Returns the width of one column. */
    getColumnWidth() {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        return body.offsetWidth + this.sideMargin * 2;
    }
    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    setLeftColumnsWidth(width) {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            body.scrollLeft = width;
        }
        else {
            body.style.left = -width + "px";
        }
    }
    /** Returns number in range [0..1) representing the
        proportion of columns that are currently positioned
        to the left of the iframe viewport. */
    getCurrentPosition() {
        const width = this.getColumnWidth();
        const leftWidth = this.getLeftColumnsWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = leftWidth + width + rightWidth;
        return leftWidth / totalWidth;
    }
    /** Returns the current 1-indexed page number. */
    getCurrentPage() {
        return this.getCurrentPosition() * this.getPageCount() + 1;
    }
    /** Returns the total number of pages. */
    getPageCount() {
        const width = this.getColumnWidth();
        const leftWidth = this.getLeftColumnsWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = leftWidth + width + rightWidth;
        return totalWidth / width;
    }
    onFirstPage() {
        const leftWidth = this.getLeftColumnsWidth();
        return (leftWidth <= 0);
    }
    onLastPage() {
        const rightWidth = this.getRightColumnsWidth();
        return (rightWidth <= 0);
    }
    goToPreviousPage() {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();
        this.setLeftColumnsWidth(leftWidth - width);
    }
    goToNextPage() {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();
        this.setLeftColumnsWidth(leftWidth + width);
    }
    /** Goes to a position specified by a number in the range [0..1].
        The position should be a number as returned by getCurrentPosition,
        or 1 to go to the last page. The position will be rounded down so
        it matches the position of one of the columns. */
    /** @param position Number in range [0..1] */
    goToPosition(position) {
        this.setSize();
        // If the window has changed size since the columns were set up,
        // we need to reset position so we can determine the new total width.
        this.setLeftColumnsWidth(0);
        const width = this.getColumnWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = width + rightWidth;
        const newLeftWidth = position * totalWidth;
        // Round the new left width so it's a multiple of the column width.
        let roundedLeftWidth = Math.round(newLeftWidth / width) * width;
        if (roundedLeftWidth >= totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    }
    goToElement(elementId, relative) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Get the element's position in the iframe, and
            // round that to figure out the column it's in.
            // There is a bug in Safari when using getBoundingClientRect
            // on an element that spans multiple columns. Temporarily
            // set the element's height to fit it on one column so we
            // can determine the first column position.
            const originalHeight = element.style.height;
            element.style.height = "0";
            const left = element.getBoundingClientRect().left;
            const width = this.getColumnWidth();
            let roundedLeftWidth = Math.floor(left / width) * width;
            if (relative) {
                const origin = this.getLeftColumnsWidth();
                roundedLeftWidth = (Math.floor(left / width) * width) + origin;
            }
            // Restore element's original height.
            element.style.height = originalHeight;
            this.setLeftColumnsWidth(roundedLeftWidth);
        }
    }
}
exports.default = ColumnsPaginatedBookView;


/***/ }),

/***/ "./src/DayTheme.ts":
/*!*************************!*\
  !*** ./src/DayTheme.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class DayTheme {
    constructor() {
        this.name = "day-theme";
        this.label = "Day";
    }
    start() {
        const rootElement = document.documentElement;
        HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "day");
    }
    stop() {
        const rootElement = document.documentElement;
        HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
    }
}
exports.default = DayTheme;


/***/ }),

/***/ "./src/EventHandler.ts":
/*!*****************************!*\
  !*** ./src/EventHandler.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserUtilities = __importStar(__webpack_require__(/*! ./BrowserUtilities */ "./src/BrowserUtilities.ts"));
class EventHandler {
    constructor() {
        this.pendingMouseEventStart = null;
        this.pendingMouseEventEnd = null;
        this.pendingTouchEventStart = null;
        this.pendingTouchEventEnd = null;
        this.onLeftTap = () => { };
        this.onMiddleTap = () => { };
        this.onRightTap = () => { };
        this.onBackwardSwipe = () => { };
        this.onForwardSwipe = () => { };
        this.onLeftArrow = () => { };
        this.onRightArrow = () => { };
        this.onLeftHover = () => { };
        this.onRightHover = () => { };
        this.onRemoveHover = () => { };
        this.onInternalLink = () => { };
        this.handleMouseEventStart = (event) => {
            this.pendingMouseEventStart = event;
        };
        this.handleTouchEventStart = (event) => {
            if (BrowserUtilities.isZoomed()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            this.pendingTouchEventStart = event;
        };
        this.handleMouseEventEnd = (event) => {
            if (!this.pendingMouseEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (this.pendingMouseEventStart.clientX - event.clientX) / devicePixelRatio;
            const yDevicePixels = (this.pendingMouseEventStart.clientY - event.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE) {
                if (this.pendingMouseEventEnd) {
                    // This was a double click. Let the browser handle it.
                    this.pendingMouseEventStart = null;
                    this.pendingMouseEventEnd = null;
                    return;
                }
                // This was a single click.
                this.pendingMouseEventStart = null;
                this.pendingMouseEventEnd = event;
                setTimeout(this.handleClick, EventHandler.DOUBLE_CLICK_MS);
                return;
            }
            this.pendingMouseEventEnd = null;
            // This is a swipe or highlight. Let the browser handle it.
            // (Swipes aren't handled on desktop.)
            this.pendingMouseEventStart = null;
        };
        this.handleTouchEventEnd = (event) => {
            event.preventDefault();
            if (BrowserUtilities.isZoomed()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            if (!this.pendingTouchEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const startTouch = this.pendingTouchEventStart.changedTouches[0];
            const endTouch = event.changedTouches[0];
            if (!startTouch) {
                // Somehow we saved a touch event with no touches.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (startTouch.clientX - endTouch.clientX) / devicePixelRatio;
            const yDevicePixels = (startTouch.clientY - endTouch.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE) {
                if (this.pendingTouchEventEnd) {
                    // This was a double tap. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap or long press.
                if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.LONG_PRESS_MS) {
                    // This was a long press. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap.
                this.pendingTouchEventStart = null;
                this.pendingTouchEventEnd = event;
                setTimeout(this.handleTap, EventHandler.DOUBLE_TAP_MS);
                return;
            }
            this.pendingTouchEventEnd = null;
            if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.SLOW_SWIPE_MS) {
                // This is a slow swipe / highlight. Let the browser handle it.
                this.pendingTouchEventStart = null;
                return;
            }
            // This is a swipe. 
            const slope = (startTouch.clientY - endTouch.clientY) / (startTouch.clientX - endTouch.clientX);
            if (Math.abs(slope) > 0.5) {
                // This is a mostly vertical swipe. Ignore.
                this.pendingTouchEventStart = null;
                return;
            }
            // This was a horizontal swipe.
            if (xDevicePixels < 0) {
                this.onBackwardSwipe(event);
            }
            else {
                this.onForwardSwipe(event);
            }
            this.pendingTouchEventStart = null;
        };
        this.handleClick = () => {
            if (!this.pendingMouseEventEnd) {
                // Another click happened already.
                return;
            }
            if (this.checkForLink(this.pendingMouseEventEnd)) {
                // This was a single click on a link. Do nothing.
                this.pendingMouseEventEnd = null;
                return;
            }
            // This was a single click.
            const x = this.pendingMouseEventEnd.clientX;
            const width = window.innerWidth;
            if (x / width < 0.3) {
                this.onLeftTap(this.pendingMouseEventEnd);
            }
            else if (x / width > 0.7) {
                this.onRightTap(this.pendingMouseEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingMouseEventEnd);
            }
            this.pendingMouseEventEnd = null;
            return;
        };
        this.handleTap = () => {
            if (!this.pendingTouchEventEnd) {
                // Another tap happened already.
                return;
            }
            if (this.checkForLink(this.pendingTouchEventEnd)) {
                this.handleLinks(this.pendingTouchEventEnd);
                // This was a single tap on a link. Do nothing.
                this.pendingTouchEventEnd = null;
                return;
            }
            // This was a single tap.
            const touch = this.pendingTouchEventEnd.changedTouches[0];
            if (!touch) {
                // Somehow we got a touch event with no touches.
                return;
            }
            const x = touch.clientX;
            const width = window.innerWidth;
            if (x / width < 0.3) {
                this.onLeftTap(this.pendingTouchEventEnd);
            }
            else if (x / width > 0.7) {
                this.onRightTap(this.pendingTouchEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingTouchEventEnd);
            }
            this.pendingTouchEventEnd = null;
            return;
        };
        this.checkForLink = (event) => {
            let nextElement = event.target;
            while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
                if (nextElement.tagName.toLowerCase() === "a" && nextElement.href) {
                    return nextElement;
                }
                else {
                    nextElement = nextElement.parentElement;
                }
            }
            return null;
        };
        // private handleMouseMove = (event: MouseEvent): void => {
        //     const x = event.clientX;
        //     const width = window.innerWidth;
        //     if (x / width < 0.3) {
        //         this.onLeftHover();
        //     } else if (x / width > 0.7) {
        //         this.onRightHover();
        //     } else {
        //         this.onRemoveHover();
        //     }
        // }
        this.handleMouseLeave = () => {
            this.onRemoveHover();
        };
        this.handleLinks = (event) => {
            const link = this.checkForLink(event);
            if (link) {
                // Open external links in new tabs.
                const isSameOrigin = (window.location.protocol === link.protocol &&
                    window.location.port === link.port &&
                    window.location.hostname === link.hostname);
                const isInternal = (link.href.indexOf("#"));
                if (!isSameOrigin) {
                    window.open(link.href, "_blank");
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (isSameOrigin && isInternal !== -1) {
                    this.onInternalLink(event);
                }
                else if (isSameOrigin && isInternal === -1) {
                    link.click();
                }
            }
        };
        this.handleKeyboard = (event) => {
            const LEFT_ARROW = 37;
            const RIGHT_ARROW = 39;
            const TAB_KEY = 9;
            if (event.keyCode === LEFT_ARROW) {
                this.onLeftArrow(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.onRightArrow(event);
            }
            else if (event.keyCode === TAB_KEY) {
                event.preventDefault();
            }
        };
    }
    setupEvents(element) {
        if (element !== null) {
            element.addEventListener("touchstart", this.handleTouchEventStart.bind(this));
            element.addEventListener("touchend", this.handleTouchEventEnd.bind(this));
            element.addEventListener("mousedown", this.handleMouseEventStart.bind(this));
            element.addEventListener("mouseup", this.handleMouseEventEnd.bind(this));
            // element.addEventListener("mouseenter", this.handleMouseMove.bind(this));
            // element.addEventListener("mousemove", this.handleMouseMove.bind(this));
            element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
            // Most click handling is done in the touchend and mouseup event handlers,
            // but if there's a click on an external link we need to cancel the click
            // event to prevent it from opening in the iframe.
            element.addEventListener("click", this.handleLinks.bind(this));
            element.addEventListener("keydown", this.handleKeyboard.bind(this));
        }
        else {
            throw "cannot setup events for null";
        }
    }
}
exports.default = EventHandler;
EventHandler.CLICK_PIXEL_TOLERANCE = 10;
EventHandler.TAP_PIXEL_TOLERANCE = 10;
EventHandler.DOUBLE_CLICK_MS = 200;
EventHandler.LONG_PRESS_MS = 500;
EventHandler.DOUBLE_TAP_MS = 200;
EventHandler.SLOW_SWIPE_MS = 500;


/***/ }),

/***/ "./src/HTMLUtilities.ts":
/*!******************************!*\
  !*** ./src/HTMLUtilities.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStylesheet = exports.createStylesheet = exports.removeAttr = exports.setAttr = exports.findRequiredIframeElement = exports.findIframeElement = exports.findRequiredElement = exports.findElement = void 0;
/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
function findElement(parentElement, selector) {
    return parentElement.querySelector(selector);
}
exports.findElement = findElement;
/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
function findRequiredElement(parentElement, selector) {
    const element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    }
    else {
        return element;
    }
}
exports.findRequiredElement = findRequiredElement;
/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
function findIframeElement(parentElement, selector) {
    if (parentElement === null) {
        throw "parent element is null";
    }
    else {
        return parentElement.querySelector(selector);
    }
}
exports.findIframeElement = findIframeElement;
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
function findRequiredIframeElement(parentElement, selector) {
    const element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    }
    else {
        return element;
    }
}
exports.findRequiredIframeElement = findRequiredIframeElement;
/** Sets an attribute and its value for an HTML element */
function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}
exports.setAttr = setAttr;
/** Removes an attribute for an HTML element */
function removeAttr(element, attr) {
    element.removeAttribute(attr);
}
exports.removeAttr = removeAttr;
/** Creates an internal stylesheet in an HTML element */
function createStylesheet(element, id, cssStyles) {
    const head = element.querySelector("head");
    const stylesheet = document.createElement("style");
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}
exports.createStylesheet = createStylesheet;
/** Removes an existing internal stylesheet in an HTML element */
function removeStylesheet(element, id) {
    const head = element.querySelector("head");
    const stylesheet = head.querySelector("#" + id);
    head.removeChild(stylesheet);
}
exports.removeStylesheet = removeStylesheet;


/***/ }),

/***/ "./src/IFrameNavigator.ts":
/*!********************************!*\
  !*** ./src/IFrameNavigator.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cacher_1 = __webpack_require__(/*! ./Cacher */ "./src/Cacher.ts");
const Manifest_1 = __importDefault(__webpack_require__(/*! ./Manifest */ "./src/Manifest.ts"));
const EventHandler_1 = __importDefault(__webpack_require__(/*! ./EventHandler */ "./src/EventHandler.ts"));
// import * as BrowserUtilities from "./BrowserUtilities";
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
const IconLib = __importStar(__webpack_require__(/*! ./IconLib */ "./src/IconLib.ts"));
const epubReadingSystemObject = {
    name: "Webpub viewer",
    version: "0.1.0"
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
      <span>There was an error loading this page.</span>
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
class IFrameNavigator {
    constructor(store, cacher = null, settings, annotator = null, publisher = null, serif = null, sans = null, day = null, sepia = null, night = null, paginator = null, scroller = null, eventHandler = null, upLinkConfig = null, allowFullscreen = null) {
        this.upLink = null;
        this.fullscreen = null;
        this.canFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
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
        this.eventHandler = eventHandler || new EventHandler_1.default();
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
                if (this.scroller && (this.settings.getSelectedView() !== this.scroller)) {
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
        const iframeContainer = document.getElementById('iframe-container');
        if (iframeContainer) {
            iframeContainer.addEventListener("focus", this.handleIframeFocus.bind(this));
        }
        const nextPageBtn = document.getElementById('next-page-btn');
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', this.handleNextPageClick.bind(this));
        }
        const prevPageBtn = document.getElementById('prev-page-btn');
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', this.handlePreviousPageClick.bind(this));
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
                const tab = (event.keyCode === TAB_KEY);
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
                const tab = (event.keyCode === TAB_KEY);
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
    ;
    updateFont() {
        this.handleResize();
    }
    updateFontSize() {
        this.handleResize();
    }
    updateBookView() {
        const doNothing = () => { };
        if (this.settings.getSelectedView() === this.paginator) {
            const prevBtn = document.getElementById('prev-page-btn');
            if (prevBtn && prevBtn.classList.contains("hidden")) {
                prevBtn.classList.remove("hidden");
            }
            const nextBtn = document.getElementById('next-page-btn');
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
            const prevBtn = document.getElementById('prev-page-btn');
            if (prevBtn && !prevBtn.classList.contains("hidden")) {
                prevBtn.classList.add("hidden");
            }
            const nextBtn = document.getElementById('next-page-btn');
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
        if (this.cacher && this.cacher.getStatus() !== Cacher_1.CacheStatus.Downloaded) {
            this.cacher.enable();
        }
    }
    updateOfflineCacheStatus(status) {
        const statusElement = this.settings.getOfflineStatusElement();
        let statusMessage = "";
        if (status === Cacher_1.CacheStatus.Uncached) {
            statusMessage = "";
        }
        else if (status === Cacher_1.CacheStatus.UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        }
        else if (status === Cacher_1.CacheStatus.CheckingForUpdate) {
            statusMessage = "Checking for update.";
        }
        else if (status === Cacher_1.CacheStatus.Downloading) {
            statusMessage = "Downloading...";
        }
        else if (status === Cacher_1.CacheStatus.Downloaded) {
            statusMessage = "Downloaded for offline use";
        }
        else if (status === Cacher_1.CacheStatus.Error) {
            statusMessage = "Error downloading for offline use";
        }
        statusElement.innerHTML = statusMessage;
    }
    loadManifest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manifest = yield Manifest_1.default.getManifest(this.manifestUrl, this.store);
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
                            if (event.target && event.target.tagName.toLowerCase() === "a") {
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
                                        position: 0
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
                    this.upLink.addEventListener('click', this.handleClick, false);
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
                        position: 0
                    };
                    this.navigate(position);
                }
                return new Promise(resolve => resolve());
            }
            catch (err) {
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
                if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
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
                    return new Promise(resolve => resolve());
                }
                this.updatePositionInfo();
                const manifest = yield Manifest_1.default.getManifest(this.manifestUrl, this.store);
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
                return new Promise(resolve => resolve());
            }
            catch (err) {
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
        window.parent.postMessage('backButtonClicked', "*");
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
            if (openIcon && (openIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
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
            if (closeIcon && (closeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
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
            if (activeIcon && (activeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
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
            const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
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
                        position: 1
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
                        position: 0
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
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
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
        const iframeContainer = document.getElementById('iframe-container');
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
            this.chapterPosition.innerHTML = "Page " + currentPage + " of " + pageCount;
        }
        else {
            this.chapterPosition.innerHTML = "";
        }
    }
    handlePreviousChapterClick(event) {
        if (this.previousChapterLink.hasAttribute("href")) {
            const position = {
                resource: this.previousChapterLink.href,
                position: 0
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
                position: 0
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
                    position: position
                });
            }
            else {
                return new Promise(resolve => resolve());
            }
        });
    }
}
exports.default = IFrameNavigator;


/***/ }),

/***/ "./src/IconLib.ts":
/*!************************!*\
  !*** ./src/IconLib.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.icons = exports.VIEWBOX_ATTR = exports.HEIGHT_ATTR = exports.WIDTH_ATTR = void 0;
exports.WIDTH_ATTR = 24;
exports.HEIGHT_ATTR = 24;
exports.VIEWBOX_ATTR = `0 0 25 25`;
const iconTemplate = (id, title, path, classAttr = `icon`) => `<svg xmlns="http://www.w3.org/2000/svg" width="${exports.WIDTH_ATTR}" height="${exports.HEIGHT_ATTR}" viewBox="${exports.VIEWBOX_ATTR}" preserveAspectRatio="xMidYMid meet" role="img" class="${classAttr}" aria-labelledBy="${id}">
  <title id="${id}">${title}</title>
  ${path}
</svg>`;
const iconSymbol = (id, title, path, classAttr = `svgIcon use`) => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="${classAttr}">
  <defs>
    <symbol id="${id}" viewBox="${exports.VIEWBOX_ATTR}">
      <title>${title}</title>
      ${path}
    </symbol>
  </defs>
</svg>`;
const iconUse = (id, classAttr) => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="${classAttr}" role="img" aria-labelledby="${id}">
  <use xlink:href="#${id}"></use>
</svg>`;
exports.icons = {
    "checkOriginal": iconSymbol(`check-icon`, `Checked`, `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>`),
    "checkDupe": iconUse("check-icon", "checkedIcon"),
    "closeOriginal": iconSymbol(`close-icon`, `Close`, `<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>`),
    "closeDupe": iconUse("close-icon", "icon close inactive-icon"),
    "error": iconTemplate(`error-icon`, `Warning`, `<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>`),
    "home": `<path d="M13.048,8.85a4.934,4.934,0,0,1,.879.322,0.893,0.893,0,0,0,.475.263,0.771,0.771,0,0,0,.352-0.609,1.481,1.481,0,0,0-.076-0.837,1.18,1.18,0,0,0-1.119-.351,2.931,2.931,0,0,0-.773.123c-0.27.082-.644,0.263-0.486,0.638A1.2,1.2,0,0,0,13.048,8.85Z" />
  <path d="M12.444,0A12.5,12.5,0,1,0,25,12.5,12.468,12.468,0,0,0,12.444,0ZM5.15,21.271a1.841,1.841,0,0,1-.457-0.562c-1.06-1.7-1.658-7.7-.287-9.746,0.434-.714.9-0.386,0.744,0.17a4.505,4.505,0,0,0,.5,3.278c0.949,2,3.873,4.771,4.646,5.777a7.852,7.852,0,0,1,1.764,3.319c-0.006.258-.059,0.427-0.516,0.386A11.339,11.339,0,0,1,5.15,21.271Zm18.344-5.7c-0.094.293-.205,0.661-0.445,0.492a10.744,10.744,0,0,0-2.39-1.317c-0.053-.012-0.047-0.082-0.029-0.123a1.67,1.67,0,0,0,.129-0.468,1.228,1.228,0,0,1,.228-0.41,4.186,4.186,0,0,0,.434-1.5,3.646,3.646,0,0,0-.07-1.188A2.7,2.7,0,0,1,21.2,10.53c0-.17.082-0.345,0.1-0.544a1.614,1.614,0,0,0-1.072-1.235c-0.9-.416-1.851-0.79-2.818-1.305a11.027,11.027,0,0,1-1.424-1.258,10.435,10.435,0,0,0-2.437-1.054,0.228,0.228,0,0,1-.193-0.193,5.677,5.677,0,0,0-2.127-3.3c-0.4-.31.047-0.486,0.6-0.515A11.389,11.389,0,0,1,23.494,15.57Zm-3.527-3.834c-0.006-.047-0.023-0.193-0.023-0.222a0.6,0.6,0,0,1,.24-0.246,2.091,2.091,0,0,1,.334-0.234c0.029-.018.053,0.023,0.059,0.035a3.181,3.181,0,0,1-.029,2.254c-0.029.059-.076,0.082-0.094,0.041a1.454,1.454,0,0,0-.492-0.615,0.115,0.115,0,0,1-.035-0.1A2.749,2.749,0,0,0,19.967,11.736ZM9.491,6.4a3.811,3.811,0,0,1,3.029-.433,13.8,13.8,0,0,1,2.15.784c0.685,0.316,1.172.9,1.81,1.247,0.8,0.445,1.91.656,2.76,1.071a0.8,0.8,0,0,1,.5.451,3.059,3.059,0,0,1-1.623-.023,0.524,0.524,0,0,0-.615.094,0.906,0.906,0,0,0,.059.749,0.979,0.979,0,0,0,.469.509c0.275,0.129.656,0.135,0.908,0.281a1.227,1.227,0,0,1,.182,1.6,2.206,2.206,0,0,1-1.746.4,5.289,5.289,0,0,0-2,.105,2.328,2.328,0,0,0-1.043,1,0.12,0.12,0,0,1-.17.023c-1.775-1.065-4.019-1.616-5.214-3.307a3.638,3.638,0,0,1-.58-1.528A3.018,3.018,0,0,1,9.491,6.4ZM6.72,3.214c-0.352-.041-0.357-0.3-0.205-0.4a8.284,8.284,0,0,1,1.623-.837A0.8,0.8,0,0,1,8.589,1.9a4.956,4.956,0,0,1,2.086.972c1.043,0.743,1.974,2.16,1.353,2.043a5.866,5.866,0,0,0-.68-0.1c-0.469-.041-0.779.006-1-0.018a0.434,0.434,0,0,1-.234-0.123A5.867,5.867,0,0,0,6.72,3.214Zm9.292,11.473a0.675,0.675,0,0,1,.3-0.41,3.043,3.043,0,0,1,1.242-.222,3.994,3.994,0,0,0,1.26-.2,0.773,0.773,0,0,1,.691-0.217,0.5,0.5,0,0,1,.264.322,1.25,1.25,0,0,1,.07.486,13.41,13.41,0,0,1-.58,1.352,0.451,0.451,0,0,1-.07.246,2.132,2.132,0,0,1-1.652.217,2.074,2.074,0,0,1-.592-0.1,1.145,1.145,0,0,1-.293-0.24,6.619,6.619,0,0,1-.51-0.544,0.851,0.851,0,0,1-.228-0.293A1.2,1.2,0,0,1,16.012,14.686ZM4.09,4.812a0.521,0.521,0,0,1,.27-0.17,6.908,6.908,0,0,1,4.365.369C8.982,5.128,9.1,5.286,8.929,5.4a8.935,8.935,0,0,0-1.236.89,0.562,0.562,0,0,1-.4.082,6.571,6.571,0,0,0-4.1.486C2.883,6.983,2.6,6.808,2.742,6.562A10.008,10.008,0,0,1,4.09,4.812Zm-2.818,5.45a0.49,0.49,0,0,1,.123-0.3,7.869,7.869,0,0,1,4.412-2.54,0.628,0.628,0,0,1,.644.111c0.1,0.24-.1.38-0.34,0.515-4.166,2.488-3.873,6.187-3.914,7.7,0.012,0.62-.434.732-0.545,0.439A10.877,10.877,0,0,1,1.271,10.261Zm5.25,2.909a4.944,4.944,0,0,1,.07-4c0.164-.31.322-0.509,0.533-0.451,0.228,0.064.281,0.293,0.311,0.726,0.228,3.565,2.39,4.771,5.1,6.029a15.622,15.622,0,0,1,6.615,5.368c0.311,0.439.352,0.7,0.006,0.954a11.145,11.145,0,0,1-4.019,1.826c-0.246.059-.5,0.012-0.727-0.55C12.122,17.168,8.279,17.437,6.521,13.17Zm14.19,7.252c-0.352.345-.545,0.076-0.662-0.146a10.28,10.28,0,0,0-1.734-2.745,0.178,0.178,0,0,1,.164-0.3,1.287,1.287,0,0,0,.691-0.111,1.383,1.383,0,0,0,.633-0.9c0.1-.339.1-0.445,0.311-0.462a0.632,0.632,0,0,1,.205.023,2.5,2.5,0,0,1,.732.433,6.868,6.868,0,0,1,1.412,1.539,0.4,0.4,0,0,1-.047.4A11.284,11.284,0,0,1,20.711,20.423Z" />`, "expand": iconTemplate(`expand-icon`, `Enter fullscreen`, `<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>`, `icon active-icon`),
    "loading": iconTemplate(`loading-icon`, `Loading`, `<path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>`),
    "menu": iconTemplate(`menu-icon`, `Show and hide navigation bar`, `<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>`, `icon menu open inactive-icon`),
    "minimize": iconTemplate(`minimize-icon`, `Exit fullscreen`, `<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>`, `icon inactive-icon`),
    "next": iconTemplate(`next-icon`, `Next Chapter`, `<path d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"/>`),
    "previous": iconTemplate(`previous-icon`, `Previous Chapter`, `<path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>`),
    "settings": iconTemplate(`settings-icon`, `Settings`, `<path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>`, `icon open`),
    "toc": iconTemplate(`toc-icon`, `Table of Contents`, `<path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>`, `icon open`)
};
exports.default = {
    icons: exports.icons,
    WIDTH_ATTR: exports.WIDTH_ATTR,
    HEIGHT_ATTR: exports.HEIGHT_ATTR
};


/***/ }),

/***/ "./src/LocalAnnotator.ts":
/*!*******************************!*\
  !*** ./src/LocalAnnotator.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Annotator that stores annotations locally, in the browser. */
class LocalAnnotator {
    constructor(config) {
        this.store = config.store;
    }
    getLastReadingPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            const positionString = yield this.store.get(LocalAnnotator.LAST_READING_POSITION);
            if (positionString) {
                const position = JSON.parse(positionString);
                return new Promise(resolve => resolve(position));
            }
            return new Promise(resolve => resolve());
        });
    }
    saveLastReadingPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const positionString = JSON.stringify(position);
            yield this.store.set(LocalAnnotator.LAST_READING_POSITION, positionString);
            return new Promise(resolve => resolve());
        });
    }
}
exports.default = LocalAnnotator;
LocalAnnotator.LAST_READING_POSITION = "last-reading-position";


/***/ }),

/***/ "./src/LocalStorageStore.ts":
/*!**********************************!*\
  !*** ./src/LocalStorageStore.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryStore_1 = __importDefault(__webpack_require__(/*! ./MemoryStore */ "./src/MemoryStore.ts"));
/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
class LocalStorageStore {
    constructor(config) {
        this.prefix = config.prefix;
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            const testKey = config.prefix + "-" + String(Math.random());
            window.localStorage.setItem(testKey, "test");
            window.localStorage.removeItem(testKey);
            this.fallbackStore = null;
        }
        catch (e) {
            this.fallbackStore = new MemoryStore_1.default();
        }
    }
    getLocalStorageKey(key) {
        return this.prefix + "-" + key;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = null;
            if (!this.fallbackStore) {
                value = window.localStorage.getItem(this.getLocalStorageKey(key));
            }
            else {
                value = yield this.fallbackStore.get(key);
            }
            return new Promise(resolve => resolve(value));
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fallbackStore) {
                window.localStorage.setItem(this.getLocalStorageKey(key), value);
            }
            else {
                yield this.fallbackStore.set(key, value);
            }
            return new Promise(resolve => resolve());
        });
    }
}
exports.default = LocalStorageStore;


/***/ }),

/***/ "./src/Manifest.ts":
/*!*************************!*\
  !*** ./src/Manifest.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Manifest {
    constructor(manifestJSON, manifestUrl) {
        this.metadata = manifestJSON.metadata || {};
        this.links = manifestJSON.links || [];
        this.spine = (manifestJSON.readingOrder || manifestJSON.spine) || [];
        this.resources = manifestJSON.resources || [];
        this.toc = manifestJSON.toc || [];
        this.manifestUrl = manifestUrl;
    }
    static getManifest(manifestUrl, store) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchManifest = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield window.fetch(manifestUrl.href);
                const manifestJSON = yield response.json();
                if (store) {
                    yield store.set("manifest", JSON.stringify(manifestJSON));
                }
                return new Manifest(manifestJSON, manifestUrl);
            });
            const tryToUpdateManifestButIgnoreResult = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fetchManifest();
                }
                catch (err) {
                    // Ignore errors.
                }
                return new Promise(resolve => resolve());
            });
            // Respond immediately with the manifest from the store, if possible.
            if (store) {
                const manifestString = yield store.get("manifest");
                if (manifestString) {
                    // Kick off a fetch to update the store for next time,
                    // but don't await it.
                    tryToUpdateManifestButIgnoreResult();
                    const manifestJSON = JSON.parse(manifestString);
                    return new Manifest(manifestJSON, manifestUrl);
                }
            }
            return fetchManifest();
        });
    }
    getStartLink() {
        if (this.spine.length > 0) {
            return this.spine[0];
        }
        return null;
    }
    getPreviousSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index > 0) {
            return this.spine[index - 1];
        }
        return null;
    }
    getNextSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index < (this.spine.length - 1)) {
            return this.spine[index + 1];
        }
        return null;
    }
    getSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null) {
            return this.spine[index];
        }
        return null;
    }
    getSpineIndex(href) {
        for (let index = 0; index < this.spine.length; index++) {
            const item = this.spine[index];
            if (item.href) {
                const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    }
    getTOCItem(href) {
        const findItem = (href, links) => {
            for (let index = 0; index < links.length; index++) {
                const item = links[index];
                if (item.href) {
                    const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                    if (itemUrl === href) {
                        return item;
                    }
                }
                if (item.children) {
                    const childItem = findItem(href, item.children);
                    if (childItem !== null) {
                        return childItem;
                    }
                }
            }
            return null;
        };
        return findItem(href, this.toc);
    }
}
exports.default = Manifest;


/***/ }),

/***/ "./src/MemoryStore.ts":
/*!****************************!*\
  !*** ./src/MemoryStore.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Class that stores key/value pairs in memory. */
class MemoryStore {
    constructor() {
        this.store = {};
    }
    get(key) {
        const value = this.store[key] || null;
        return new Promise(resolve => resolve(value));
    }
    set(key, value) {
        this.store[key] = value;
        return new Promise(resolve => resolve());
    }
}
exports.default = MemoryStore;


/***/ }),

/***/ "./src/NightTheme.ts":
/*!***************************!*\
  !*** ./src/NightTheme.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class NightTheme {
    constructor() {
        this.name = "night-theme";
        this.label = "Night";
    }
    start() {
        const rootElement = document.documentElement;
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "night");
        HTMLUtilities.createStylesheet(rootFrame, "night-mode-internal", ":root {background-color: #111 !important; color: #FFFFFF !important} :not(a) {background-color: transparent !important; color: #FFFFFF !important; border-color: currentColor !important;} a {color: #53CEEA !important;}");
    }
    stop() {
        const rootElement = document.documentElement;
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
        HTMLUtilities.removeStylesheet(rootFrame, "night-mode-internal");
    }
}
exports.default = NightTheme;


/***/ }),

/***/ "./src/PublisherFont.ts":
/*!******************************!*\
  !*** ./src/PublisherFont.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class PublisherFont {
    constructor() {
        this.name = "publisher-font";
        this.label = "Publisher";
    }
    start() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "publisher");
    }
    stop() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
    }
}
exports.default = PublisherFont;


/***/ }),

/***/ "./src/SansFont.ts":
/*!*************************!*\
  !*** ./src/SansFont.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class SansFont {
    constructor() {
        this.name = "sans-font";
        this.label = "Sans-serif";
    }
    start() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "sans");
        HTMLUtilities.createStylesheet(rootFrame, "sans-font-internal", "* {font-family: Seravek, Calibri, Roboto, Arial, sans-serif !important;}");
    }
    stop() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
        HTMLUtilities.removeStylesheet(rootFrame, "sans-font-internal");
    }
}
exports.default = SansFont;


/***/ }),

/***/ "./src/ScrollingBookView.ts":
/*!**********************************!*\
  !*** ./src/ScrollingBookView.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserUtilities = __importStar(__webpack_require__(/*! ./BrowserUtilities */ "./src/BrowserUtilities.ts"));
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class ScrollingBookView {
    constructor() {
        this.name = "scrolling-book-view";
        this.label = "Scrolling";
        this.sideMargin = 0;
        this.height = 0;
    }
    // Get available width for iframe container to sit within
    getAvailableWidth() {
        const prevBtn = document.getElementById('prev-page-btn');
        let prevBtnWidth = 0;
        if (prevBtn) {
            prevBtn.classList.add("hidden");
            const rect = prevBtn.getBoundingClientRect();
            prevBtnWidth = rect.width;
        }
        const nextBtn = document.getElementById('next-page-btn');
        let nextBtnWidth = 0;
        if (nextBtn) {
            const rect = nextBtn.getBoundingClientRect();
            nextBtnWidth = rect.width;
        }
        return window.innerWidth - prevBtnWidth - nextBtnWidth;
    }
    getAvailableHeight() {
        const topBar = document.getElementById('top-control-bar');
        let topHeight = 0;
        if (topBar) {
            const topRect = topBar.getBoundingClientRect();
            topHeight = topRect.height;
        }
        const bottomBar = document.getElementById('bottom-control-bar');
        let bottomHeight = 0;
        if (bottomBar) {
            const bottomRect = bottomBar.getBoundingClientRect();
            bottomHeight = bottomRect.height;
        }
        return window.innerHeight - topHeight - bottomHeight;
    }
    setIFrameSize() {
        const width = this.getAvailableWidth() + "px";
        this.bookElement.style.height = this.getAvailableHeight() + "px";
        this.bookElement.style.width = width;
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        this.bookElement.style.height = this.getAvailableHeight() + "px";
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = width;
        }
    }
    start(position) {
        this.goToPosition(position);
    }
    stop() {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = "";
        }
    }
    getCurrentPosition() {
        return document.body.scrollTop / document.body.scrollHeight;
    }
    atBottom() {
        return (document.body.scrollHeight - document.body.scrollTop) === BrowserUtilities.getHeight();
    }
    goToPosition(position) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }
    goToElement(elementId) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Put the element as close to the top as possible.
            element.scrollIntoView();
            // Unless we're already at the bottom, scroll up so the element is
            // in the middle, and not covered by the top nav.
            if ((document.body.scrollHeight - element.offsetTop) >= this.height) {
                document.body.scrollTop = Math.max(0, document.body.scrollTop - this.height / 3);
            }
        }
    }
}
exports.default = ScrollingBookView;


/***/ }),

/***/ "./src/SepiaTheme.ts":
/*!***************************!*\
  !*** ./src/SepiaTheme.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class SepiaTheme {
    constructor() {
        this.name = "sepia-theme";
        this.label = "Sepia";
    }
    start() {
        const rootElement = document.documentElement;
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "sepia");
        HTMLUtilities.createStylesheet(rootFrame, "sepia-mode-internal", ":root {background-color: #f6ecd9 !important}  img, svg {background-color: transparent !important; mix-blend-mode: multiply;}");
    }
    stop() {
        const rootElement = document.documentElement;
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
        HTMLUtilities.removeStylesheet(rootFrame, "sepia-mode-internal");
    }
}
exports.default = SepiaTheme;


/***/ }),

/***/ "./src/SerifFont.ts":
/*!**************************!*\
  !*** ./src/SerifFont.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(__webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts"));
class SerifFont {
    constructor() {
        this.name = "serif-font";
        this.label = "Serif";
    }
    start() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "serif");
        HTMLUtilities.createStylesheet(rootFrame, "serif-font-internal", "* {font-family: 'Iowan Old Style', 'Sitka Text', Palatino, 'Book Antiqua', serif !important;}");
    }
    stop() {
        const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
        HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
        HTMLUtilities.removeStylesheet(rootFrame, "serif-font-internal");
    }
}
exports.default = SerifFont;


/***/ }),

/***/ "./src/ServiceWorkerCacher.ts":
/*!************************************!*\
  !*** ./src/ServiceWorkerCacher.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cacher_1 = __webpack_require__(/*! ./Cacher */ "./src/Cacher.ts");
const Manifest_1 = __importDefault(__webpack_require__(/*! ./Manifest */ "./src/Manifest.ts"));
/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
class ServiceWorkerCacher {
    /** Create a ServiceWorkerCacher. */
    constructor(config) {
        this.cacheStatus = Cacher_1.CacheStatus.Uncached;
        this.statusUpdateCallback = () => { };
        this.serviceWorkerUrl = config.serviceWorkerUrl || new URL("sw.js", config.manifestUrl.href);
        this.staticFileUrls = config.staticFileUrls || [];
        this.store = config.store;
        this.manifestUrl = config.manifestUrl;
        const protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.areServiceWorkersSupported && (this.cacheStatus !== Cacher_1.CacheStatus.Downloaded)) {
                this.cacheStatus = Cacher_1.CacheStatus.Downloading;
                this.updateStatus();
                navigator.serviceWorker.register(this.serviceWorkerUrl.href);
                try {
                    yield this.verifyAndCacheManifest(this.manifestUrl);
                    this.cacheStatus = Cacher_1.CacheStatus.Downloaded;
                    this.updateStatus();
                }
                catch (err) {
                    this.cacheStatus = Cacher_1.CacheStatus.Error;
                    this.updateStatus();
                }
            }
            return new Promise(resolve => resolve());
        });
    }
    verifyAndCacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield navigator.serviceWorker.ready;
            try {
                // Invoke promises concurrently...
                const urlsToCache = [manifestUrl.href];
                for (const url of this.staticFileUrls) {
                    urlsToCache.push(url.href);
                }
                const promises = [this.cacheManifest(manifestUrl), this.cacheUrls(urlsToCache, manifestUrl)];
                // then wait for all of them to resolve.
                for (const promise of promises) {
                    yield promise;
                }
                return new Promise(resolve => resolve());
            }
            catch (err) {
                return new Promise((_, reject) => reject(err));
            }
        });
    }
    cacheUrls(urls, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield window.caches.open(manifestUrl.href);
            return cache.addAll(urls.map(url => new URL(url, manifestUrl.href).href));
        });
    }
    cacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const manifest = yield Manifest_1.default.getManifest(manifestUrl, this.store);
            const promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
            for (const promise of promises) {
                yield promise;
            }
            return new Promise(resolve => resolve());
        });
    }
    cacheSpine(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.spine) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    cacheResources(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.resources) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    onStatusUpdate(callback) {
        this.statusUpdateCallback = callback;
        this.updateStatus();
    }
    getStatus() {
        return this.cacheStatus;
    }
    updateStatus() {
        this.statusUpdateCallback(this.cacheStatus);
    }
}
exports.default = ServiceWorkerCacher;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorageStore_1 = __importDefault(__webpack_require__(/*! ./LocalStorageStore */ "./src/LocalStorageStore.ts"));
const ServiceWorkerCacher_1 = __importDefault(__webpack_require__(/*! ./ServiceWorkerCacher */ "./src/ServiceWorkerCacher.ts"));
const IFrameNavigator_1 = __importDefault(__webpack_require__(/*! ./IFrameNavigator */ "./src/IFrameNavigator.ts"));
const PublisherFont_1 = __importDefault(__webpack_require__(/*! ./PublisherFont */ "./src/PublisherFont.ts"));
const SerifFont_1 = __importDefault(__webpack_require__(/*! ./SerifFont */ "./src/SerifFont.ts"));
const SansFont_1 = __importDefault(__webpack_require__(/*! ./SansFont */ "./src/SansFont.ts"));
const DayTheme_1 = __importDefault(__webpack_require__(/*! ./DayTheme */ "./src/DayTheme.ts"));
const SepiaTheme_1 = __importDefault(__webpack_require__(/*! ./SepiaTheme */ "./src/SepiaTheme.ts"));
const NightTheme_1 = __importDefault(__webpack_require__(/*! ./NightTheme */ "./src/NightTheme.ts"));
const ColumnsPaginatedBookView_1 = __importDefault(__webpack_require__(/*! ./ColumnsPaginatedBookView */ "./src/ColumnsPaginatedBookView.ts"));
const ScrollingBookView_1 = __importDefault(__webpack_require__(/*! ./ScrollingBookView */ "./src/ScrollingBookView.ts"));
const BookSettings_1 = __importDefault(__webpack_require__(/*! ./BookSettings */ "./src/BookSettings.ts"));
const LocalAnnotator_1 = __importDefault(__webpack_require__(/*! ./LocalAnnotator */ "./src/LocalAnnotator.ts"));
const app = (element, manifestUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const bookStore = new LocalStorageStore_1.default({ prefix: manifestUrl.href });
    const cacher = new ServiceWorkerCacher_1.default({ store: bookStore, manifestUrl });
    const annotator = new LocalAnnotator_1.default({ store: bookStore });
    const publisher = new PublisherFont_1.default();
    const serif = new SerifFont_1.default();
    const sans = new SansFont_1.default();
    const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const day = new DayTheme_1.default();
    const sepia = new SepiaTheme_1.default();
    const night = new NightTheme_1.default();
    const paginator = new ColumnsPaginatedBookView_1.default();
    const scroller = new ScrollingBookView_1.default();
    const settingsStore = new LocalStorageStore_1.default({ prefix: "cassis-reader" });
    const settings = yield BookSettings_1.default.create({
        store: settingsStore,
        bookFonts: [publisher, serif, sans],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: 20,
        bookThemes: [day, sepia, night],
        bookViews: [paginator, scroller]
    });
    return yield IFrameNavigator_1.default.create({
        element,
        manifestUrl,
        store: bookStore,
        cacher,
        settings,
        annotator,
        publisher,
        serif,
        sans,
        day,
        sepia,
        night,
        paginator,
        scroller
    });
});
exports.default = app;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map