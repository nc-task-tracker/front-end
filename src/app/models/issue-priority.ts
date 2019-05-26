export enum IssuePriority {
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
  TRIVIAL = 'TRIVIAL',
  MINOR = 'MINOR'
}

export interface IssuePriorityModel {
  readonly type : IssuePriority,
  readonly title : string
}

export enum IssuePriorityNameMapping {
  MAJOR = 'Major',
  CRITICAL = 'Critical',
  BLOCKER = 'Blocker',
  TRIVIAL = 'Trivial',
  MINOR = 'Minor'
}

export const allIssuePriority: IssuePriorityModel[] = [
  {
    type: IssuePriority.MAJOR,
    title: IssuePriorityNameMapping[IssuePriority.MAJOR]
  },
  {
    type: IssuePriority.CRITICAL,
    title: IssuePriorityNameMapping[IssuePriority.CRITICAL]
  },
  {
    type: IssuePriority.BLOCKER,
    title: IssuePriorityNameMapping[IssuePriority.BLOCKER]
  },
  {
    type: IssuePriority.TRIVIAL,
    title: IssuePriorityNameMapping[IssuePriority.TRIVIAL]
  },
  {
    type: IssuePriority.MINOR,
    title: IssuePriorityNameMapping[IssuePriority.MINOR]
  }
  ]
