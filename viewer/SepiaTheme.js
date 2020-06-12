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
//# sourceMappingURL=SepiaTheme.js.map