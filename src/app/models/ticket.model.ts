import {User} from './user.model';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  RESOLVED = 'RESOLVED',
  REOPENED = 'REOPEND',
  CLOSED = 'CLOSED'
}

export enum TicketPriority {
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
  TRIVIAL = 'TRIVIAL',
  MINOR = 'MINOR'
}

export interface TicketPriorityObject {
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

export const allTicketPriority: TicketPriorityObject[] = [
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

export enum TicketType {
  TASK = 'TASK',
  BUG = 'BUG',
  EPIC = 'EPIC',
  IMPROVEMENT = 'IMPROVEMENT',
  STORY = 'STORY',
  NEW_FEATURE = 'NEW FEATURE'
}

export enum TicketTypeLabel {
  TASK = 'Task',
  BUG = 'Bug',
  EPIC = 'Epic',
  IMPROVEMENT = 'Improvement',
  STORY = 'Story',
  NEW_FEATURE = 'New feature'
}

export const allTicketTypes: TicketTypeObject[] = [
  {
    type: TicketType.BUG,
    title: 'Bug'
  },
  {
    type: TicketType.EPIC,
    title: 'Epic'
  },
  {
    type: TicketType.IMPROVEMENT,
    title: 'Improvement'
  },
  {
    type: TicketType.NEW_FEATURE,
    title: 'New feature'
  },
  {
    type: TicketType.STORY,
    title: 'Story'
  },
  {
    type: TicketType.TASK,
    title: 'Task'
  }
];


export interface TicketTypeObject {
  readonly type: TicketType;
  readonly title: string;
}

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
