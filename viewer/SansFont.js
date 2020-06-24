import * as HTMLUtilities from "./HTMLUtilities";
export default class SansFont {
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
//# sourceMappingURL=SansFont.js.map