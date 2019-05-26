import {allIssueType, IssueTypeModel} from "./issue-type.model";

export enum FilterType {
  ISSUE_NAME = 'ISSUE_NAME',
  ISSUE_TYPE = 'ISSUE_TYPE',
  ISSUE_STATUS = 'ISSUE_STATUS',
  ISSUE_PRIORITY = 'ISSUE_PRIORITY',
  ASSIGNEE = 'ASSIGNEE',
  REPORTER = 'REPORTER',

  PROJECTS = 'PROJECTS',

  DUE_DATE = 'DUE_DATE',
  START_DATE = 'START_DATE',

  PROJECT_NAME = 'PROJECT_NAME',

  SEARCH_STRING = 'SEARCH_STRING'
}

export enum FilterTypeNameMapping {

  ISSUE_NAME = "Ticket name",
  ISSUE_TYPE = 'Issue types',
  ISSUE_STATUS = 'Issue status',
  ISSUE_PRIORITY = 'Issue priority',

  PROJECTS = 'Projects',
  ASSIGNEE = 'Assignee',
  REPORTER = 'Reporter',

  SEARCH_STRING = 'Search string'
}

export interface FilterFormModel {
  readonly searchString: string;
  readonly issueType: IssueTypeModel[];
}

export const allFilterTypeLabled = [
  {
    type: FilterType.SEARCH_STRING,
    title: FilterTypeNameMapping[FilterType.SEARCH_STRING],
    hidden: false,
    key: 'searchString'
  },
  {
    type: FilterType.ISSUE_TYPE,
    title: FilterTypeNameMapping[FilterType.ISSUE_TYPE],
    hidden: false,
    key: 'issueType',
  },
  {
    type: FilterType.ISSUE_STATUS,
    title: FilterTypeNameMapping[FilterType.ISSUE_STATUS],
    hidden: false,
    key: 'issueStatus'
  },
  {
    type: FilterType.ISSUE_PRIORITY,
    title: FilterTypeNameMapping[FilterType.ISSUE_PRIORITY],
    hidden: false,
    key: 'issuePriority'
  },
  {
    type: FilterType.ISSUE_NAME,
    title: FilterTypeNameMapping[FilterType.ISSUE_NAME],
    hidden: false,
    key: 'ticketNames'
  },
  {
    type: FilterType.PROJECTS,
    title: FilterTypeNameMapping[FilterType.PROJECTS],
    hidden: false,
    key: 'projects'
  },
  {
    type: FilterType.ASSIGNEE,
    title: FilterTypeNameMapping[FilterType.ASSIGNEE],
    hidden: false,
    key: 'assignee'
  },
  {
    type: FilterType.REPORTER,
    title: FilterTypeNameMapping[FilterType.REPORTER],
    hidden: false,
    key: 'reporter'
  }
];

export enum FieldType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  ASSIGNEE = 'ASSIGNEE',
  PROJECTS = 'PROJECTS',
  ISSUE_NAME = 'ISSUE_NAME'
}

export interface FilterItem<T = any> {
  readonly type: FilterType;
  readonly value: T;
  readonly fieldType?: FieldType;
  readonly key?: string;
  readonly placeholder?: string;
  readonly title?: string;
}

export interface Filter {
  readonly id?: string;
  readonly name?: string;
  readonly parameters: FilterItem[];
}

export const defaultFilter: Filter ={
  id: null,
  name: 'new filter',
  parameters: [
    {
      type: FilterType.ISSUE_TYPE,
      value: [...allIssueType]
    }
  ]
}

export interface InputFilterItem extends FilterItem<string> {
}

export interface SelectFilterItem<D = any> extends FilterItem<Array<D>> {
  readonly options: Array<D>;
  readonly multiple: boolean;
  readonly titleKey: string;
  readonly itemValueKey?: string;
}

export interface InputModel {
  readonly type: FilterType;
  readonly key: string;
  readonly value?: any;
}
