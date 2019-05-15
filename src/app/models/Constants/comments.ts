import {Comment} from '../comment.model';
import {defaultProfile} from '../profile.model';
// import {defaultTicket} from '../ticket.model';

export const allComments: Comment[] = [
  {id: '1', commentText: 'Comment_1', time: new Date('01/01/2012'), issueId: '1', profile: defaultProfile},
  {id: '2', commentText: 'Comment_2', time: new Date('01/01/2014'), issueId: '1', profile: defaultProfile},
  {id: '3', commentText: 'Comment_3', time: new Date('01/01/2011'), issueId: '1', profile: defaultProfile},
  {id: '4', commentText: 'Comment_3', time: new Date('01/01/2011'), issueId: '1', profile: defaultProfile},
  {id: '5', commentText: 'Comment_3', time: new Date('01/01/2011'), issueId: '1', profile: defaultProfile},
  {id: '6', commentText: 'Comment_3', time: new Date('01/01/2011'), issueId: '1', profile: defaultProfile},
  {id: '7', commentText: 'Comment_3', time: new Date('01/01/2011'), issueId: '1', profile: defaultProfile}
];
