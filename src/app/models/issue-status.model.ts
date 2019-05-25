
export enum IssueStatus {
  OPEN = 'OPEN',
  // IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export interface IssueStatusModel {
  readonly type: IssueStatus;
  readonly title: string;
}

export enum IssueStatusNameMapping {
  OPEN = 'Open',
  // IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed'
}

export const allIssueStatus: IssueStatusModel[] = [
  {
    type: IssueStatus.OPEN,
    title: IssueStatusNameMapping[IssueStatus.OPEN]
  },
  // {
  //     issueType: IssueStatus.IN_PROGRESS,
  //     title: IssueStatusNameMapping[IssueStatus.IN_PROGRESS]
  // },
  {
    type: IssueStatus.CLOSED,
    title: IssueStatusNameMapping[IssueStatus.CLOSED]
  },
];
