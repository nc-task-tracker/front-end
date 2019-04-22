export enum IssueType {
  Bug,Feature,Task,Improvement,Epic
}

export enum IssueStatus {
  Open,Closed,Reopen,Resolved,InProgress
}

export enum IssuePriority {
  Lowest,Low,Medium,High,Highest
}

export interface Issue {
  readonly id: string;
  readonly issueName: string;
  readonly issueDescription: string;
  readonly issueType: IssueType;
  readonly issueStatus: IssueStatus;
  readonly dueDate: Date;
  readonly startDate: Date;
  readonly issuePriority: IssuePriority;
}
