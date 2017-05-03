import * as HTMLUtilities from "./HTMLUtilities";

const template = `
    <div class="tutorial-page tutorial-page-1">
      <p>Tap or swipe left or right to turn pages.</p>
      <button class="tutorial-next">Next</button>
      <button class="tutorial-skip">Skip</button>
    </div>
    <div class="tutorial-page tutorial-page-2" style="display: none">
      <p>Tap the center to show and hide controls.</p>
      <button class="tutorial-done">Done</button>
    </div>
`;

export default class Tutorial {
    private container: HTMLElement;
    private page1: HTMLDivElement;
    private page2: HTMLDivElement;
    private next: HTMLButtonElement;
    private skip: HTMLButtonElement;
    private done: HTMLButtonElement;

    public renderControls(element: HTMLElement): void {
        this.container = element;
        element.innerHTML = template;
        this.page1 = HTMLUtilities.findRequiredElement(element, ".tutorial-page-1") as HTMLDivElement;
        this.page2 = HTMLUtilities.findRequiredElement(element, ".tutorial-page-2") as HTMLDivElement;
        this.next = HTMLUtilities.findRequiredElement(element, ".tutorial-next") as HTMLButtonElement;
        this.skip = HTMLUtilities.findRequiredElement(element, ".tutorial-skip") as HTMLButtonElement;
        this.done = HTMLUtilities.findRequiredElement(element, ".tutorial-done") as HTMLButtonElement;

        this.next.addEventListener("click", this.goToNext.bind(this));
        this.skip.addEventListener("click", this.hide.bind(this));
        this.done.addEventListener("click", this.hide.bind(this));

        this.container.addEventListener("click", this.goToNext.bind(this));
        this.container.addEventListener("touchend", this.goToNext.bind(this));
        this.container.addEventListener("mouseup", this.goToNext.bind(this));

        this.container.style.display = "block";
    }

    private hide(): void {
        this.container.style.display = "none";
    }

    private goToNext(): void {
        if (this.page1.style.display !== "none") {
            this.page1.style.display = "none";
            this.page2.style.display = "block";
        } else {
            this.hide();
        }
    }
}