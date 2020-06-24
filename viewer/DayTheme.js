import * as HTMLUtilities from "./HTMLUtilities";
export default class DayTheme {
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
//# sourceMappingURL=DayTheme.js.map