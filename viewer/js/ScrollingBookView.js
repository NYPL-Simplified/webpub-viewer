import * as BrowserUtilities from "./BrowserUtilities";
import * as HTMLUtilities from "./HTMLUtilities";
export default class ScrollingBookView {
    constructor() {
        this.name = "scrolling-book-view";
        this.label = "Scrolling";
        this.sideMargin = 0;
        this.height = 0;
    }
    // Get available width for iframe container to sit within
    getAvailableWidth() {
        const prevBtn = document.getElementById('prev-page-btn');
        let prevBtnWidth = 0;
        if (prevBtn) {
            prevBtn.classList.add("hidden");
            const rect = prevBtn.getBoundingClientRect();
            prevBtnWidth = rect.width;
        }
        const nextBtn = document.getElementById('next-page-btn');
        let nextBtnWidth = 0;
        if (nextBtn) {
            const rect = nextBtn.getBoundingClientRect();
            nextBtnWidth = rect.width;
        }
        return window.innerWidth - prevBtnWidth - nextBtnWidth;
    }
    getAvailableHeight() {
        const topBar = document.getElementById('top-control-bar');
        let topHeight = 0;
        if (topBar) {
            const topRect = topBar.getBoundingClientRect();
            topHeight = topRect.height;
        }
        const bottomBar = document.getElementById('bottom-control-bar');
        let bottomHeight = 0;
        if (bottomBar) {
            const bottomRect = bottomBar.getBoundingClientRect();
            bottomHeight = bottomRect.height;
        }
        return window.innerHeight - topHeight - bottomHeight;
    }
    setIFrameSize() {
        const width = this.getAvailableWidth() + "px";
        this.bookElement.style.height = this.getAvailableHeight() + "px";
        this.bookElement.style.width = width;
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        this.bookElement.style.height = this.getAvailableHeight() + "px";
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = width;
        }
    }
    start(position) {
        this.goToPosition(position);
    }
    stop() {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = "";
        }
    }
    getCurrentPosition() {
        return document.body.scrollTop / document.body.scrollHeight;
    }
    atBottom() {
        return (document.body.scrollHeight - document.body.scrollTop) === BrowserUtilities.getHeight();
    }
    goToPosition(position) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }
    goToElement(elementId) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Put the element as close to the top as possible.
            element.scrollIntoView();
            // Unless we're already at the bottom, scroll up so the element is
            // in the middle, and not covered by the top nav.
            if ((document.body.scrollHeight - element.offsetTop) >= this.height) {
                document.body.scrollTop = Math.max(0, document.body.scrollTop - this.height / 3);
            }
        }
    }
}
//# sourceMappingURL=ScrollingBookView.js.map