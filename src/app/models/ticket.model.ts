import {testUser, User} from './user.model';
import {TicketPriority, TicketPriorityLabel} from './Enums/TicketPriority.enum';
import {TicketStatus, TicketStatusLabel} from './Enums/TicketStatus.enum';
import {TicketPriorityObject} from './ticket-priority.model';
import {TicketStatusObject} from './ticket-status.model';
import {TicketType, TicketTypeLabel} from './Enums/TicketType.enum';
import {TicketTypeObject} from './ticket-type.model';

export const allTicketPriority: TicketPriorityObject[] = [
  {
    priority: TicketPriority.TRIVIAL,
    title: TicketPriorityLabel.TRIVIAL
  },
  {
    priority: TicketPriority.MINOR,
    title: TicketPriorityLabel.MINOR
  },
  {
    priority: TicketPriority.MAJOR,
    title: TicketPriorityLabel.MAJOR
  },
  {
    priority: TicketPriority.CRITICAL,
    title: TicketPriorityLabel.CRITICAL
  },
  {
    priority: TicketPriority.BLOCKER,
    title: TicketPriorityLabel.BLOCKER
  }
];

export const allTicketStatus: TicketStatusObject[] = [
  {
    status: TicketStatus.TO_DO,
    title: TicketStatusLabel.TO_DO
  },
  {
    status: TicketStatus.PROGRESS,
    title: TicketStatusLabel.PROGRESS
  },
  {
    status: TicketStatus.OPEN,
    title: TicketStatusLabel.OPEN
  },
  {
    status: TicketStatus.CLOSED,
    title: TicketStatusLabel.CLOSED
  },
  {
    status: TicketStatus.REOPENED,
    title: TicketStatusLabel.REOPENED
  },
  {
    status: TicketStatus.RESOLVED,
    title: TicketStatusLabel.RESOLVED
  }
];

export const allTicketType: TicketTypeObject[] = [
  {
    type: TicketType.BUG,
    title: TicketTypeLabel.BUG
  },

  {
    type: TicketType.EPIC,
    title: TicketTypeLabel.EPIC
  },

  {
    type: TicketType.IMPROVEMENT,
    title: TicketTypeLabel.IMPROVEMENT
  },
  {
    type: TicketType.NEW_FEATURE,
    title: TicketTypeLabel.NEW_FEATURE
  },
  {
    type: TicketType.STORY,
    title: TicketTypeLabel.STORY
  },
  {
    type: TicketType.TASK,
    title: TicketTypeLabel.TASK
  },
];

// TODO back-end model
export interface Ticket {
  readonly id: string;
  readonly name: string;
  readonly type: TicketType;
  readonly  priority: TicketPriority;
  readonly  status: TicketStatus;
  readonly  description: string;
  readonly  reporter: User;
  readonly  assignee: User;
}

export const Ticket_1: Ticket = {
  id: '1',
  name: 'Name',
  type: TicketType.TASK,
  priority: TicketPriority.MINOR,
  status: TicketStatus.RESOLVED,
  description: 'description',
  reporter: testUser,
  assignee: testUser,
};
