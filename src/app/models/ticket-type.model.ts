import {TicketType, TicketTypeLabel} from './Enums/TicketType.enum';

export interface TicketTypeObject {
  readonly type: TicketType;
  readonly title: TicketTypeLabel;
}
