import BookView from "./BookView";
import * as BrowserUtilities from "./BrowserUtilities";
import * as HTMLUtilities from "./HTMLUtilities";

export default class ScrollingBookView implements BookView {
  public readonly name = "scrolling-book-view";
  public readonly label = "Scrolling";

  public bookElement: HTMLIFrameElement;
  public sideMargin = 0;
  public height = 0;

  // Get available width for iframe container to sit within
  private getAvailableWidth(): number {
    const prevBtn = document.getElementById("prev-page-btn");
    let prevBtnWidth = 0;
    if (prevBtn) {
      prevBtn.classList.add("hidden");
      const rect = prevBtn.getBoundingClientRect();
      prevBtnWidth = rect.width;
    }
    const nextBtn = document.getElementById("next-page-btn");
    let nextBtnWidth = 0;
    if (nextBtn) {
      const rect = nextBtn.getBoundingClientRect();
      nextBtnWidth = rect.width;
    }

    return window.innerWidth - prevBtnWidth - nextBtnWidth;
  }
  private getAvailableHeight(): number {
    const topBar = document.getElementById("top-control-bar");
    let topHeight = 0;
    if (topBar) {
      const topRect = topBar.getBoundingClientRect();
      topHeight = topRect.height;
    }
    const bottomBar = document.getElementById("bottom-control-bar");
    let bottomHeight = 0;
    if (bottomBar) {
      const bottomRect = bottomBar.getBoundingClientRect();
      bottomHeight = bottomRect.height;
    }

    return window.innerHeight - topHeight - bottomHeight;
  }

  private setIFrameSize(): void {
    const width = this.getAvailableWidth() + "px";
    this.bookElement.style.height = this.getAvailableHeight() + "px";
    this.bookElement.style.width = width;

    const body = HTMLUtilities.findRequiredIframeElement(
      this.bookElement.contentDocument,
      "body"
    ) as HTMLBodyElement;
    this.bookElement.style.height = this.getAvailableHeight() + "px";

    const images = Array.prototype.slice.call(body.querySelectorAll("img"));
    for (const image of images) {
      image.style.maxWidth = width;
    }
  }

  public start(position: number): void {
    this.goToPosition(position);
  }

  public stop(): void {
    this.bookElement.style.height = "";
    this.bookElement.style.width = "";

    const body = HTMLUtilities.findRequiredIframeElement(
      this.bookElement.contentDocument,
      "body"
    ) as HTMLBodyElement;
    body.style.width = "";
    body.style.marginLeft = "";
    body.style.marginRight = "";

    const images = Array.prototype.slice.call(body.querySelectorAll("img"));
    for (const image of images) {
      image.style.maxWidth = "";
    }
  }

  public getCurrentPosition(): number {
    return document.body.scrollTop / document.body.scrollHeight;
  }

  public atBottom(): boolean {
    return (
      document.body.scrollHeight - document.body.scrollTop ===
      BrowserUtilities.getHeight()
    );
  }

  public goToPosition(position: number) {
    this.setIFrameSize();
    document.body.scrollTop = document.body.scrollHeight * position;
  }

  public goToElement(elementId: string) {
    const element = (this.bookElement.contentDocument as any).getElementById(
      elementId
    );
    if (element) {
      // Put the element as close to the top as possible.
      element.scrollIntoView();

      // Unless we're already at the bottom, scroll up so the element is
      // in the middle, and not covered by the top nav.
      if (document.body.scrollHeight - element.offsetTop >= this.height) {
        document.body.scrollTop = Math.max(
          0,
          document.body.scrollTop - this.height / 3
        );
      }
      return true;
    }
    return false;
  }
}
