// // Typescript Utils for DOM Access

export function isAnchorElement(element: HTMLElement): element is HTMLAnchorElement {
    return "tagName" in element && element.tagName.toLowerCase() === "a";
  }