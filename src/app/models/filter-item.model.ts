export enum FilterType {
    SEARCH_STRING = 'SEARCH_STRING',
    ISSUE_TYPES = 'ISSUE_TYPES',
    ISSUE_STATUS = 'ISSUE_STATUS',
    ISSUE_PRIORITY = 'ISSUE_PRIORITY',
    ASSIGNEE = 'ASSIGNEE',
    PROJECTS = 'PROJECTS',
    REPORTER = 'REPORTER'
}

export enum FilterTypeNameMapping {
    SEARCH_STRING = 'Search string',
    ISSUE_TYPES = 'Issue types',
    ISSUE_STATUS = 'Issue status',
    ISSUE_PRIORITY = 'Issue priority',
    PROJECTS = 'Projects',
    ASSIGNEE = 'Assignee',
    REPORTER = 'Reporter'
}

export const allFilterTypeLabled = [
    {
        type: FilterType.SEARCH_STRING,
        title: FilterTypeNameMapping[FilterType.SEARCH_STRING],
        hidden: false,
        key: 'searchString'
    },
    {
        type: FilterType.ISSUE_TYPES,
        title: FilterTypeNameMapping[FilterType.ISSUE_TYPES],
        hidden: false,
        key: 'issueTypes'
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
    ASSIGNEE = 'ASSIGNEE'
}

export interface FilterItem<T = any> {
    readonly type: FilterType;
    readonly value: T;
    readonly fieldType: FieldType;
    readonly key: string;
    readonly placeholder?: string;
    readonly title?: string;
}

export interface InputFilterItem extends FilterItem<string> {
}

export interface SelectFilterItem<D> extends FilterItem<Array<D>> {
    readonly options: Array<D>;
    readonly multiple: boolean;
    readonly titleKey: string;
}

export interface InputModel {
    readonly type: FilterType;
    readonly key: string;
    readonly value?: any;
}
