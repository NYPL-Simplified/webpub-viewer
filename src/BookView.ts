interface BookView {
    name: string;
    label: string;

    bookElement: Element;
    sideMargin: number;
    height: number;

    /** Load this view in its book element, at the specified position. */
    start(position: number): void;

    /** Remove this view from its book element. */
    stop(): void;

    getCurrentPosition(): number;
    goToPosition(position: number): void;
    goToElement(elementId: string, relative?: boolean): void;
}
export default BookView;