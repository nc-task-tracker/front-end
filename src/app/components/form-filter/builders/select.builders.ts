import {Injectable} from '@angular/core';
import {AbstractBuilder} from './abstract.builder';
import {FieldType, FilterItem, FilterType, InputModel, SelectFilterItem} from '../../../models/filter-item.model';
// import { Project } from '../models/project.model';
import {allIssueType, IssueTypeModel} from '../../../models/issue-type.model';
import {User} from 'src/app/models/user.model';
import {Project} from "../../../models/project.model";
import {allIssueStatus, IssueStatusModel} from "../../../models/issue-status.model";
import {allIssuePriority, IssuePriorityModel} from "../../../models/issue-priority";
import {SearchModel} from "src/app/models/search-model.model";

@Injectable()
export class ProjectBuilder implements AbstractBuilder<InputModel, SelectFilterItem<Project>> {
    type: FilterType = FilterType.PROJECTS;

    build(model: InputModel): SelectFilterItem<Project> {
        return {
            ...model,
            fieldType: FieldType.SELECT,
            multiple: true,
            value: model.value || [],
            placeholder: 'Projects',
            title: 'Projects',
            titleKey: 'name',
            options: [{
              id: '1',
              projectName: 'name1',
              projectDescription: '',
              ownerId: '',
              projectStatus: '',
              projectCode: ''
            }]
        };
    }
}

@Injectable()
export class IssueTypeBuilder implements AbstractBuilder<InputModel, SelectFilterItem<IssueTypeModel>> {
    type: FilterType = FilterType.ISSUE_TYPE;

    build(model: InputModel): SelectFilterItem<IssueTypeModel> {
        return {
            ...model,
            fieldType: FieldType.SELECT,
            multiple: true,
            title: 'Issue Types',
            placeholder: 'Issue Types',
            titleKey: 'title',
            value: model.value || [],
            options: [...allIssueType],
            itemValueKey: 'type'
        };
    }
}

@Injectable()
export class IssueStatusBuilder implements AbstractBuilder<InputModel, SelectFilterItem<IssueStatusModel>> {
    type: FilterType = FilterType.ISSUE_STATUS;

    build(model: InputModel): SelectFilterItem<IssueStatusModel> {
        return {
            ...model,
            fieldType: FieldType.SELECT,
            multiple: true,
            title: 'Issue Status',
            placeholder: 'Issue Status',
            titleKey: 'title',
            value: model.value || [],
            options: [...allIssueStatus],
            itemValueKey: 'type'
        };
    }
}

@Injectable()
export class IssuePriorityBuilder implements AbstractBuilder<InputModel, SelectFilterItem<IssuePriorityModel>>{
    type: FilterType = FilterType.ISSUE_PRIORITY;

    build(model: InputModel): SelectFilterItem<IssuePriorityModel> {
        return {
          ...model,
          fieldType: FieldType.SELECT,
          multiple: true,
          title: 'Issue Priority',
          placeholder: 'Issue Priority',
          titleKey: 'title',
          value: model.value || [],
          options: [...allIssuePriority],
          itemValueKey: 'type'
        }
    }
}

@Injectable()
export class AssigneeBuilder implements AbstractBuilder<InputModel, SelectFilterItem<User>> {
    type: FilterType = FilterType.ASSIGNEE;

    build(model: InputModel): SelectFilterItem<User> {
        return {
            ...model,
            fieldType: FieldType.ASSIGNEE,
            multiple: true,
            title: 'Assignee',
            placeholder: 'Assignee',
            titleKey: 'login',
            value: model.value || [],
            options: [],
            itemValueKey: 'id'
        };
    }
}

@Injectable()
export class ReporterBuilder implements AbstractBuilder<InputModel, SelectFilterItem<SearchModel>> {
    type: FilterType = FilterType.REPORTER;

    build(model: InputModel): SelectFilterItem<SearchModel> {
        return {
            ...model,
            fieldType: FieldType.ASSIGNEE,
            multiple: true,
            title: 'Reporter',
            placeholder: 'Reporter',
            titleKey: 'login',
            value: model.value || [],
            options: [],
          itemValueKey: 'id'
        };
    }
}

@Injectable()
export class IssueNameBuilder implements AbstractBuilder<InputModel, SelectFilterItem<SearchModel>> {
    type: FilterType = FilterType.ISSUE_NAME;

    build(model: InputModel): SelectFilterItem<SearchModel> {
        return {
            ...model,
            fieldType: FieldType.ISSUE_NAME,
            multiple: true,
            title: 'Ticket issueName',
            placeholder: 'Ticket issueName',
            titleKey: 'name',
            value: model.value || [],
            options: [],
          itemValueKey: 'id'
        };
    }
}
