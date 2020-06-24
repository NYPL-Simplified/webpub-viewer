/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
export function findElement(parentElement, selector) {
    return parentElement.querySelector(selector);
}
/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
export function findRequiredElement(parentElement, selector) {
    const element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    }
    else {
        return element;
    }
}
/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
export function findIframeElement(parentElement, selector) {
    if (parentElement === null) {
        throw "parent element is null";
    }
    else {
        return parentElement.querySelector(selector);
    }
}
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
export function findRequiredIframeElement(parentElement, selector) {
    const element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    }
    else {
        return element;
    }
}
/** Sets an attribute and its value for an HTML element */
export function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}
/** Removes an attribute for an HTML element */
export function removeAttr(element, attr) {
    element.removeAttribute(attr);
}
/** Creates an internal stylesheet in an HTML element */
export function createStylesheet(element, id, cssStyles) {
    const head = element.querySelector("head");
    const stylesheet = document.createElement("style");
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}
/** Removes an existing internal stylesheet in an HTML element */
export function removeStylesheet(element, id) {
    const head = element.querySelector("head");
    const stylesheet = head.querySelector("#" + id);
    head.removeChild(stylesheet);
}
export default {
    findElement: findElement,
    findRequiredElement: findRequiredElement,
    findIframeElement: findIframeElement,
    findRequiredIframeElement: findRequiredIframeElement,
    setAttr: setAttr,
    removeAttr: removeAttr,
    createStylesheet: createStylesheet,
    removeStylesheet: removeStylesheet,
};
//# sourceMappingURL=HTMLUtilities.js.map