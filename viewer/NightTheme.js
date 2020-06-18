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
//# sourceMappingURL=NightTheme.js.map