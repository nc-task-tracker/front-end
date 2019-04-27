import {User} from './user.model';

export enum TicketPriority {
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
  TRIVIAL = 'TRIVIAL',
  MINOR = 'MINOR'
}

export interface TicketTypeObject {
   readonly type: TicketPriority;
   readonly title: string;
}

export enum TicketPriorityLabel {
  MAJOR = 'Major',
  CRITICAL = 'Critical',
  BLOCKER = 'Blocker',
  TRIVIAL = 'Trivial',
  MINOR = 'Minor'
}

export const allTicketPriority: TicketTypeObject[] = [
  {
    type: TicketPriority.TRIVIAL,
    title: 'Trivial'
  },
  {
    type: TicketPriority.MINOR,
    title: 'Minor'
  },
  {
    type: TicketPriority.MAJOR,
    title: 'Major'
  },
  {
    type: TicketPriority.CRITICAL,
    title: 'Critical'
  },
  {
    type: TicketPriority.BLOCKER,
    title: 'Blocker'
  }
];

// TODO back-end model
export interface Ticket {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly priority: TicketPriority;
  readonly description: string;
  readonly dueDate: Date;
  readonly created: Date;
  readonly reporter: User;
  readonly assignee: User;
}

// export const Ticket_1: Ticket = {
//   id: '1',
//   name: 'Name',
//   type: TicketType.TASK,
//   priority: TicketPriority.MINOR,
//   status: TicketStatus.RESOLVED,
//   description: 'description',
//   reporter: testUser,
//   assignee: testUser,
// };
