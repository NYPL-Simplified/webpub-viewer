var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as HTMLUtilities from "./HTMLUtilities";
import * as IconLib from "./IconLib";
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
export default class BookSettings {
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
BookSettings.SELECTED_FONT_KEY = "settings-selected-font";
BookSettings.SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
BookSettings.SELECTED_THEME_KEY = "settings-selected-theme";
BookSettings.SELECTED_VIEW_KEY = "settings-selected-view";
;
//# sourceMappingURL=BookSettings.js.map