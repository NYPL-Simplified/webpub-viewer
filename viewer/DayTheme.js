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
class DayTheme {
    constructor() {
        this.name = "day-theme";
        this.label = "Day";
    }
    start() {
        const rootElement = document.documentElement;
        HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "day");
    }
    stop() {
        const rootElement = document.documentElement;
        HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
    }
}
exports.default = DayTheme;
//# sourceMappingURL=DayTheme.js.map