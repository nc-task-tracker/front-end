import {TicketStatus, TicketStatusLabel} from './Enums/TicketStatus.enum';

export interface TicketStatusObject {
  readonly type: TicketStatus;
  readonly title: TicketStatusLabel;
}
