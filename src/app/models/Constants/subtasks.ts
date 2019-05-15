import {Ticket} from '../ticket.model';
import {testUser} from '../user.model';
import {TicketType} from '../Enums/TicketType.enum';
import {defaultProject} from '../project.model';
import {TicketPriority} from '../Enums/TicketPriority.enum';
import {TicketStatus} from '../Enums/TicketStatus.enum';
import {defaultProfile} from '../profile.model';
import {Comment, defaultComment} from '../comment.model';
import {allComments} from './comments';

export const allSubtasks: Ticket [] = [
  {
    id: '1',
    issueName: 'Name_1',
    issueType: TicketType.BUG,
    issuePriority: TicketPriority.MAJOR,
    issueStatus: TicketStatus.OPEN,
    issueDescription: 'Issue_description',
    startDate: new Date('02/02/02'),
    dueDate: new Date('02/02/02'),
    project: defaultProject,
    reporter: defaultProfile,
    assignee: defaultProfile,
    parentId: '1',
    comments: null
  },

  { id: '2',
    issueName: 'Name_2',
    issueType: TicketType.TASK,
    issuePriority: TicketPriority.MINOR,
    issueStatus: TicketStatus.RESOLVED,
    issueDescription: 'Issue_description',
    startDate: new Date('02/02/02'),
    dueDate: new Date('02/02/02'),
    project: defaultProject,
    reporter: defaultProfile,
    assignee: defaultProfile,
    parentId: '1',
    comments: null
  },
  { id: '3',
    issueName: 'Name_3',
    issueType: TicketType.NEW_FEATURE,
    issuePriority: TicketPriority.MAJOR,
    issueStatus: TicketStatus.RESOLVED,
    issueDescription: 'Issue_description',
    startDate: new Date('02/02/02'),
    dueDate: new Date('02/02/02'),
    project: defaultProject,
    reporter: defaultProfile,
    assignee: defaultProfile,
    parentId: '1',
    comments: null
  },
  { id: '4',
    issueName: 'Name_4',
    issueType: TicketType.BUG,
    issuePriority: TicketPriority.BLOCKER,
    issueStatus: TicketStatus.RESOLVED,
    issueDescription: 'Issue_description',
    startDate: new Date('02/02/02'),
    dueDate: new Date('02/02/02'),
    project: defaultProject,
    reporter: defaultProfile,
    assignee: defaultProfile,
    parentId: '1',
    comments: null
  }
];
