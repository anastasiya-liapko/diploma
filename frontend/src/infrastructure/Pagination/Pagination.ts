export class Pagination {
  public size: number;
  public page: number;

  constructor() {
    this.size = 21;
    this.page = 0;
  }

  nextPage() {
    this.page++;
  }
}