import * as HTMLUtilities from "./HTMLUtilities";
export default class PublisherFont {
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
//# sourceMappingURL=PublisherFont.js.map