import {testUser, User} from './user.model';
import {TicketPriority, TicketPriorityLabel} from './Enums/TicketPriority.enum';
import {TicketStatus, TicketStatusLabel} from './Enums/TicketStatus.enum';
import {TicketPriorityObject} from './ticket-priority.model';
import {TicketStatusObject} from './ticket-status.model';
import {TicketType, TicketTypeLabel} from './Enums/TicketType.enum';
import {TicketTypeObject} from './ticket-type.model';
import {defaultProject, Project} from './project.model';
import {defaultComment, Comment} from './comment.model';

export const allTicketPriority: TicketPriorityObject[] = [
  {
    type: TicketPriority.TRIVIAL,
    title: TicketPriorityLabel.TRIVIAL
  },
  {
    type: TicketPriority.MINOR,
    title: TicketPriorityLabel.MINOR
  },
  {
    type: TicketPriority.MAJOR,
    title: TicketPriorityLabel.MAJOR
  },
  {
    type: TicketPriority.CRITICAL,
    title: TicketPriorityLabel.CRITICAL
  },
  {
    type: TicketPriority.BLOCKER,
    title: TicketPriorityLabel.BLOCKER
  }
];

export const allTicketStatus: TicketStatusObject[] = [
  {
    type: TicketStatus.TO_DO,
    title: TicketStatusLabel.TO_DO
  },
  {
    type: TicketStatus.PROGRESS,
    title: TicketStatusLabel.PROGRESS
  },
  {
    type: TicketStatus.OPEN,
    title: TicketStatusLabel.OPEN
  },
  {
    type: TicketStatus.CLOSED,
    title: TicketStatusLabel.CLOSED
  },
  {
    type: TicketStatus.REOPENED,
    title: TicketStatusLabel.REOPENED
  },
  {
    type: TicketStatus.RESOLVED,
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

export interface Ticket {
  readonly id: string;
  readonly issueName: string;
  readonly issueType: TicketType;
  readonly issuePriority: TicketPriority;
  readonly issueStatus: TicketStatus;
  readonly issueDescription: string;
  readonly startDate: string;
  readonly dueDate: Date;
  readonly project: Project;
  readonly reporter: User;
  readonly assigner: User;
}

export const defaultTicket: Ticket = {
  id: '1',
  issueName: 'Name',
  issueType: TicketType.TASK,
  issuePriority: TicketPriority.MINOR,
  issueStatus: TicketStatus.RESOLVED,
  issueDescription: 'Issue_description',
  startDate: '2018/02/02',
  dueDate: new Date('02/02/02'),
  project: defaultProject,
  reporter: testUser,
  assigner: testUser,
};
