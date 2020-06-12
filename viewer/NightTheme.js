import * as HTMLUtilities from "./HTMLUtilities";
export default class NightTheme {
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
//# sourceMappingURL=NightTheme.js.map