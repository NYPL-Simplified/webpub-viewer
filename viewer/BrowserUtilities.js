"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Returns the current width of the document. */
function getWidth() {
    return document.documentElement.clientWidth;
}
exports.getWidth = getWidth;
/** Returns the current height of the document. */
function getHeight() {
    return document.documentElement.clientHeight;
}
exports.getHeight = getHeight;
/** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
function isZoomed() {
    return (getWidth() !== window.innerWidth);
}
exports.isZoomed = isZoomed;
//# sourceMappingURL=BrowserUtilities.js.map