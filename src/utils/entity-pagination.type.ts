export class EntityPagination<entity> {
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  offset: number;

  constructor(
    public content: entity[],
    public currentPage: number,
    public pageSize: number,
    public totalEntries: number,
  ) {
    this.offset = (currentPage - 1) * pageSize;
    this.nextPage =
      totalEntries > this.offset + pageSize ? currentPage + 1 : null;
    this.previousPage = currentPage > 1 ? currentPage - 1 : null;
    this.totalPages = Math.ceil(totalEntries / pageSize);
  }

  setFormattedContent(content: entity[]): void {
    this.content = content;
  }
}
