
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
  CLOSED = 'Closed'
}

export const allIssueStatus: IssueStatusModel[] = [
  {
    type: IssueStatus.OPEN,
    title: IssueStatusNameMapping[IssueStatus.OPEN]
  },
  {
    type: IssueStatus.CLOSED,
    title: IssueStatusNameMapping[IssueStatus.CLOSED]
  },
];
