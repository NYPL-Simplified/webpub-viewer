import * as BrowserUtilities from "./BrowserUtilities";
export default class EventHandler {
    constructor() {
        this.pendingMouseEventStart = null;
        this.pendingMouseEventEnd = null;
        this.pendingTouchEventStart = null;
        this.pendingTouchEventEnd = null;
        this.onLeftTap = () => { };
        this.onMiddleTap = () => { };
        this.onRightTap = () => { };
        this.onBackwardSwipe = () => { };
        this.onForwardSwipe = () => { };
        this.onLeftArrow = () => { };
        this.onRightArrow = () => { };
        this.onLeftHover = () => { };
        this.onRightHover = () => { };
        this.onRemoveHover = () => { };
        this.onInternalLink = () => { };
        this.handleMouseEventStart = (event) => {
            this.pendingMouseEventStart = event;
        };
        this.handleTouchEventStart = (event) => {
            if (BrowserUtilities.isZoomed()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            this.pendingTouchEventStart = event;
        };
        this.handleMouseEventEnd = (event) => {
            if (!this.pendingMouseEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (this.pendingMouseEventStart.clientX - event.clientX) / devicePixelRatio;
            const yDevicePixels = (this.pendingMouseEventStart.clientY - event.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE) {
                if (this.pendingMouseEventEnd) {
                    // This was a double click. Let the browser handle it.
                    this.pendingMouseEventStart = null;
                    this.pendingMouseEventEnd = null;
                    return;
                }
                // This was a single click.
                this.pendingMouseEventStart = null;
                this.pendingMouseEventEnd = event;
                setTimeout(this.handleClick, EventHandler.DOUBLE_CLICK_MS);
                return;
            }
            this.pendingMouseEventEnd = null;
            // This is a swipe or highlight. Let the browser handle it.
            // (Swipes aren't handled on desktop.)
            this.pendingMouseEventStart = null;
        };
        this.handleTouchEventEnd = (event) => {
            event.preventDefault();
            if (BrowserUtilities.isZoomed()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            if (!this.pendingTouchEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const startTouch = this.pendingTouchEventStart.changedTouches[0];
            const endTouch = event.changedTouches[0];
            if (!startTouch) {
                // Somehow we saved a touch event with no touches.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (startTouch.clientX - endTouch.clientX) / devicePixelRatio;
            const yDevicePixels = (startTouch.clientY - endTouch.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE) {
                if (this.pendingTouchEventEnd) {
                    // This was a double tap. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap or long press.
                if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.LONG_PRESS_MS) {
                    // This was a long press. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap.
                this.pendingTouchEventStart = null;
                this.pendingTouchEventEnd = event;
                setTimeout(this.handleTap, EventHandler.DOUBLE_TAP_MS);
                return;
            }
            this.pendingTouchEventEnd = null;
            if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.SLOW_SWIPE_MS) {
                // This is a slow swipe / highlight. Let the browser handle it.
                this.pendingTouchEventStart = null;
                return;
            }
            // This is a swipe. 
            const slope = (startTouch.clientY - endTouch.clientY) / (startTouch.clientX - endTouch.clientX);
            if (Math.abs(slope) > 0.5) {
                // This is a mostly vertical swipe. Ignore.
                this.pendingTouchEventStart = null;
                return;
            }
            // This was a horizontal swipe.
            if (xDevicePixels < 0) {
                this.onBackwardSwipe(event);
            }
            else {
                this.onForwardSwipe(event);
            }
            this.pendingTouchEventStart = null;
        };
        this.handleClick = () => {
            if (!this.pendingMouseEventEnd) {
                // Another click happened already.
                return;
            }
            if (this.checkForLink(this.pendingMouseEventEnd)) {
                // This was a single click on a link. Do nothing.
                this.pendingMouseEventEnd = null;
                return;
            }
            // This was a single click.
            const x = this.pendingMouseEventEnd.clientX;
            const width = window.innerWidth;
            if (x / width < 0.3) {
                this.onLeftTap(this.pendingMouseEventEnd);
            }
            else if (x / width > 0.7) {
                this.onRightTap(this.pendingMouseEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingMouseEventEnd);
            }
            this.pendingMouseEventEnd = null;
            return;
        };
        this.handleTap = () => {
            if (!this.pendingTouchEventEnd) {
                // Another tap happened already.
                return;
            }
            if (this.checkForLink(this.pendingTouchEventEnd)) {
                this.handleLinks(this.pendingTouchEventEnd);
                // This was a single tap on a link. Do nothing.
                this.pendingTouchEventEnd = null;
                return;
            }
            // This was a single tap.
            const touch = this.pendingTouchEventEnd.changedTouches[0];
            if (!touch) {
                // Somehow we got a touch event with no touches.
                return;
            }
            const x = touch.clientX;
            const width = window.innerWidth;
            if (x / width < 0.3) {
                this.onLeftTap(this.pendingTouchEventEnd);
            }
            else if (x / width > 0.7) {
                this.onRightTap(this.pendingTouchEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingTouchEventEnd);
            }
            this.pendingTouchEventEnd = null;
            return;
        };
        this.checkForLink = (event) => {
            let nextElement = event.target;
            while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
                if (nextElement.tagName.toLowerCase() === "a" && nextElement.href) {
                    return nextElement;
                }
                else {
                    nextElement = nextElement.parentElement;
                }
            }
            return null;
        };
        // private handleMouseMove = (event: MouseEvent): void => {
        //     const x = event.clientX;
        //     const width = window.innerWidth;
        //     if (x / width < 0.3) {
        //         this.onLeftHover();
        //     } else if (x / width > 0.7) {
        //         this.onRightHover();
        //     } else {
        //         this.onRemoveHover();
        //     }
        // }
        this.handleMouseLeave = () => {
            this.onRemoveHover();
        };
        this.handleLinks = (event) => {
            const link = this.checkForLink(event);
            if (link) {
                // Open external links in new tabs.
                const isSameOrigin = (window.location.protocol === link.protocol &&
                    window.location.port === link.port &&
                    window.location.hostname === link.hostname);
                const isInternal = (link.href.indexOf("#"));
                if (!isSameOrigin) {
                    window.open(link.href, "_blank");
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (isSameOrigin && isInternal !== -1) {
                    this.onInternalLink(event);
                }
                else if (isSameOrigin && isInternal === -1) {
                    link.click();
                }
            }
        };
        this.handleKeyboard = (event) => {
            const LEFT_ARROW = 37;
            const RIGHT_ARROW = 39;
            const TAB_KEY = 9;
            if (event.keyCode === LEFT_ARROW) {
                this.onLeftArrow(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.onRightArrow(event);
            }
            else if (event.keyCode === TAB_KEY) {
                event.preventDefault();
            }
        };
    }
    setupEvents(element) {
        if (element !== null) {
            element.addEventListener("touchstart", this.handleTouchEventStart.bind(this));
            element.addEventListener("touchend", this.handleTouchEventEnd.bind(this));
            element.addEventListener("mousedown", this.handleMouseEventStart.bind(this));
            element.addEventListener("mouseup", this.handleMouseEventEnd.bind(this));
            // element.addEventListener("mouseenter", this.handleMouseMove.bind(this));
            // element.addEventListener("mousemove", this.handleMouseMove.bind(this));
            element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
            // Most click handling is done in the touchend and mouseup event handlers,
            // but if there's a click on an external link we need to cancel the click
            // event to prevent it from opening in the iframe.
            element.addEventListener("click", this.handleLinks.bind(this));
            element.addEventListener("keydown", this.handleKeyboard.bind(this));
        }
        else {
            throw "cannot setup events for null";
        }
    }
}
EventHandler.CLICK_PIXEL_TOLERANCE = 10;
EventHandler.TAP_PIXEL_TOLERANCE = 10;
EventHandler.DOUBLE_CLICK_MS = 200;
EventHandler.LONG_PRESS_MS = 500;
EventHandler.DOUBLE_TAP_MS = 200;
EventHandler.SLOW_SWIPE_MS = 500;
//# sourceMappingURL=EventHandler.js.map