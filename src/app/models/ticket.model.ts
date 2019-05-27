import {TicketPriority, TicketPriorityLabel} from './Enums/TicketPriority.enum';
import {TicketStatus, TicketStatusLabel} from './Enums/TicketStatus.enum';
import {TicketPriorityObject} from './ticket-priority.model';
import {TicketStatusObject} from './ticket-status.model';
import {TicketType, TicketTypeLabel} from './Enums/TicketType.enum';
import {TicketTypeObject} from './ticket-type.model';
import {defaultProject, Project} from './project.model';
import {defaultComment, Comment} from './comment.model';
import {Assignee} from './assignee.model';

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
  {
    type: TicketType.SUBTASK,
    title: TicketTypeLabel.SUBTASK
  },
];

export interface Ticket {
  readonly id: string;
  readonly issueName: string;
  readonly issueType: TicketType;
  readonly issuePriority: TicketPriority;
  readonly issueStatus: TicketStatus;
  readonly issueDescription: string;
  readonly code: string;
  readonly startDate: Date;
  readonly dueDate: Date;
  readonly project: Project;
  readonly reporter: string;
  readonly assignee: Assignee;
  readonly parentId: string;
  readonly subtasks: Ticket [];
  readonly comments: Comment []
}

export const defaultTicket: Ticket = {
  id: '',
  issueName: 'Sub',
  issueType: TicketType.TASK,
  issuePriority: TicketPriority.MINOR,
  issueStatus: TicketStatus.RESOLVED,
  issueDescription: 'Sub',
  code: '',
  startDate: new Date(),
  dueDate: new Date(),
  project: defaultProject,
  reporter: null,
  assignee: null,
  parentId: '',
  subtasks: null,
  comments: null
};

