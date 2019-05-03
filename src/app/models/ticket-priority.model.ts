import {TicketPriority, TicketPriorityLabel} from './Enums/TicketPriority.enum';

export interface TicketPriorityObject {
  readonly type: TicketPriority;
  readonly title: TicketPriorityLabel;
}
