"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
function findElement(parentElement, selector) {
    return parentElement.querySelector(selector);
}
exports.findElement = findElement;
/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
function findRequiredElement(parentElement, selector) {
    const element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    }
    else {
        return element;
    }
}
exports.findRequiredElement = findRequiredElement;
/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
function findIframeElement(parentElement, selector) {
    if (parentElement === null) {
        throw "parent element is null";
    }
    else {
        return parentElement.querySelector(selector);
    }
}
exports.findIframeElement = findIframeElement;
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
function findRequiredIframeElement(parentElement, selector) {
    const element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    }
    else {
        return element;
    }
}
exports.findRequiredIframeElement = findRequiredIframeElement;
/** Sets an attribute and its value for an HTML element */
function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}
exports.setAttr = setAttr;
/** Removes an attribute for an HTML element */
function removeAttr(element, attr) {
    element.removeAttribute(attr);
}
exports.removeAttr = removeAttr;
/** Creates an internal stylesheet in an HTML element */
function createStylesheet(element, id, cssStyles) {
    const head = element.querySelector("head");
    const stylesheet = document.createElement("style");
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}
exports.createStylesheet = createStylesheet;
/** Removes an existing internal stylesheet in an HTML element */
function removeStylesheet(element, id) {
    const head = element.querySelector("head");
    const stylesheet = head.querySelector("#" + id);
    head.removeChild(stylesheet);
}
exports.removeStylesheet = removeStylesheet;
//# sourceMappingURL=HTMLUtilities.js.map