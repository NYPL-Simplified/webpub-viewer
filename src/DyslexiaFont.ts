import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";

export default class DyslexiaFont implements BookFont {
  public readonly name = "dyslexia-friendly";
  public readonly label = "Dyslexia Friendly";

  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "dyslexia-friendly");
    HTMLUtilities.createStylesheet(rootFrame, "dyslexia-font-internal", "* {font-family: 'Dancing Script', cursive !important;}");
  }

  public stop(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
    HTMLUtilities.removeStylesheet(rootFrame, "dyslexia-font-internal");
  }
}