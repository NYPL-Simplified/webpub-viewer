/** Returns the current width of the document. */
export function getWidth() {
  return document.documentElement.clientWidth;
}
/** Returns the current height of the document. */
export function getHeight() {
  return document.documentElement.clientHeight;
}
/** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
export function isZoomed() {
  return getWidth() !== window.innerWidth;
}
export default {
  getWidth: getWidth,
  getHeight: getHeight,
  isZoomed: isZoomed,
};
//# sourceMappingURL=BrowserUtilities.js.map
