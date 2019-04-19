// TODO back-end model
import {User} from "./user.model";
import {TicketPriority} from "./ticket.model";

export interface Profile {
  readonly id: string;
  readonly FirstName: string;
  readonly LastName: string;

  /*readonly type: string;
  readonly priority: TicketPriority;
  readonly description: string;
  readonly dueDate: Date;
  readonly created: Date;
  readonly reporter: User;
  readonly assignee: User;*/
}
