"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLUtilities = __importStar(require("./HTMLUtilities"));
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
//# sourceMappingURL=PublisherFont.js.map