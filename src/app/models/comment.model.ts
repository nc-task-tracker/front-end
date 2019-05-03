import {defaultTicket, Ticket} from './ticket.model';
import {defaultProject, Project} from './project.model';

export interface Comment {
  readonly id: string;
  readonly commentText: string;
  readonly time: Date;
  readonly project: Project;
  readonly issue: Ticket;
}

export const defaultComment: Comment = {
  id: null,
  commentText: 'commentText',
  time: new Date('02/02/2020'),
  project: defaultProject,
  issue: defaultTicket
};
