import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";

export default class DyslexiaFont implements BookFont {
  public readonly name = "dyslexia-friendly";
  public readonly label = "Dyslexia Friendly";

  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "dyslexia-friendly");
    HTMLUtilities.createStylesheet(rootFrame, "dyslexia-font-stylesheet", 
    `@font-face {
      font-family: 'opendyslexic';
      src: url('https://nypl-static.s3.amazonaws.com/base/fonts/OpenDyslexic3-Regular.woff2') format('woff2'),
           url('https://nypl-static.s3.amazonaws.com/base/fonts/OpenDyslexic3-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }`
    );
    HTMLUtilities.createStylesheet(rootFrame, "dyslexia-font-internal", "* {font-family: 'opendyslexic' !important}");
  }

  public stop(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
    HTMLUtilities.removeStylesheet(rootFrame, "dyslexia-font-internal");
  }
}