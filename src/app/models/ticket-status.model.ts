import {TicketStatus, TicketStatusLabel} from './Enums/TicketStatus.enum';

export interface TicketStatusObject {
  readonly status: TicketStatus;
  readonly title: TicketStatusLabel;
}
