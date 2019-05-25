
export interface CreateFilter {
}

export enum FilterParameter {
  ISSUE_TYPE = 'ISSUE TYPE',
  ISSUE_STATUS = 'ISSUE STATUS',
  ISSUE_PRIORITY = 'ISSUE PRIORITY',
  ISSUE_NAME = 'ISSUE NAME'
}

export interface FilterParameterObject {
  readonly type?: FilterParameter;
  readonly title: string;
  children?: FilterParameterObject[];
}

export const allParameters: FilterParameterObject[] = [
  {
    type: FilterParameter.ISSUE_NAME,
    title: 'Issue login'
  },
  {
    type: FilterParameter.ISSUE_PRIORITY,
    title: 'Issue issuePriority',
    children:[
      {title: 'MAJOR'},
      {title: 'CRITICAL'},
      {title: 'BLOCKER'},
      {title: 'TRIVIAL'},
      {title: 'MINOR'}
      ]
  },
  {
    type: FilterParameter.ISSUE_STATUS,
    title: 'Issue issueStatus'
  },
  {
    type: FilterParameter.ISSUE_TYPE,
    title: 'Issue issueType'
  }
]
