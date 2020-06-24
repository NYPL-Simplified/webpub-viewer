import * as HTMLUtilities from "./HTMLUtilities";
export default class SerifFont {
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
//# sourceMappingURL=SerifFont.js.map