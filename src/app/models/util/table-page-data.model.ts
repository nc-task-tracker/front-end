import {Ticket} from "../ticket.model";

export interface TablePageData {
  readonly totalElem: number;
  readonly totalPages: number;
  readonly pageSize: number;
  readonly tickets: Ticket[];
}
