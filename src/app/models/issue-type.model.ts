
export enum IssueType {
    BUG = 'BUG',
    TASK = 'TASK',
    EPIC = 'EPIC',
    IMPROVEMENT = 'IMPROVEMENT',
    NEW_FEATURE = 'NEW_FEATURE',
    STORY = 'STORY',
    SUB_TASK = 'SUB_TASK'
}

export interface IssueTypeModel {
    readonly type: IssueType;
    readonly title: string;
}

export enum IssueTypeNameMapping {
  BUG = 'Buf',
  TASK = 'Task',
  EPIC = 'Epic',
  IMPROVEMENT = 'Improvement',
  NEW_FEATURE = 'New feature',
  STORY = 'Story',
  SUB_TASK = 'Sub task'
}

export const allIssueType: IssueTypeModel[] = [
    {
        type: IssueType.BUG,
        title: IssueTypeNameMapping[IssueType.BUG]
    },
    {
        type: IssueType.TASK,
        title: IssueTypeNameMapping[IssueType.TASK]
    },
    {
        type: IssueType.EPIC,
        title: IssueTypeNameMapping[IssueType.EPIC]
    },
    {
        type: IssueType.IMPROVEMENT,
        title: IssueTypeNameMapping[IssueType.IMPROVEMENT]
    },
    {
        type: IssueType.NEW_FEATURE,
        title: IssueTypeNameMapping[IssueType.NEW_FEATURE]
    },
    {
        type: IssueType.STORY,
        title: IssueTypeNameMapping[IssueType.STORY]
    },
    {
        type: IssueType.SUB_TASK,
        title: IssueTypeNameMapping[IssueType.SUB_TASK]
    },
];
