
export interface TablePageData<T> {
  readonly totalElem: number;
  readonly totalPages: number;
  readonly pageSize: number;
  readonly list: T[];
}
