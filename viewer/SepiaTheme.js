import * as HTMLUtilities from "./HTMLUtilities";
export default class SepiaTheme {
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
//# sourceMappingURL=SepiaTheme.js.map