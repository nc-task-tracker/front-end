import {defaultTicket, Ticket} from './ticket.model';
import {defaultProject, Project} from './project.model';
import {defaultProfile, Profile} from './profile.model';

export interface Comment {
  readonly id: string;
  readonly commentText: string;
  readonly time: Date;
  readonly profile: Profile,
  readonly issueId: string;
}

export const defaultComment: Comment = {
  id: null,
  commentText: 'commentText',
  time: new Date('02/02/2020'),
  profile: defaultProfile,
  issueId: '1'
};
