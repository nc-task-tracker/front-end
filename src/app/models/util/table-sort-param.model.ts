export class SortParameters {

  private _direction: string;
  private _page: number;
  private _columnName: string;
  private _maxElemOnPage: number;

  constructor(){

  }

  get direction(): string {
    return this._direction;
  }

  set direction(value: string) {
    this._direction = value;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get columnName(): string {
    return this._columnName;
  }

  set columnName(value: string) {
    this._columnName = value;
  }

  get maxElemOnPage(): number {
    return this._maxElemOnPage;
  }

  set maxElemOnPage(value: number) {
    this._maxElemOnPage = value;
  }
}
