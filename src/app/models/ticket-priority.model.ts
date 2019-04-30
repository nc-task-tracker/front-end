import {TicketPriority, TicketPriorityLabel} from './Enums/TicketPriority.enum';

export interface TicketPriorityObject {
  readonly priority: TicketPriority;
  readonly title: TicketPriorityLabel;
}
