import BookView from "./BookView.js";

interface PaginatedBookView extends BookView {
  onFirstPage(): boolean;
  onLastPage(): boolean;
  goToPreviousPage(): void;
  goToNextPage(): void;
  getCurrentPage(): number;
  getPageCount(): number;
}
export default PaginatedBookView;
