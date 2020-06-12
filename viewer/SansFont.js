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
//# sourceMappingURL=SansFont.js.map