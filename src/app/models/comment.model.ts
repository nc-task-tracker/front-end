import {Profile} from './profile.model';
import {Assignee} from './assignee.model';

export interface Comment {
  readonly id: string;
  readonly commentText: string;
  readonly time: Date;
  readonly profileId: string;
  readonly profile: Assignee;
  readonly issueId: string;
}

export const defaultComment: Comment = {
  id: null,
  commentText: '',
  time: null,
  profileId: '',
  profile: null,
  issueId: ''
};
