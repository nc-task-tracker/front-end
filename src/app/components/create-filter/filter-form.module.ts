import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFilterComponent } from './create-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatAutocomplete,
  MatAutocompleteModule, MatChipsModule, MatIconModule
} from '@angular/material';
import { FILTER_ITEM_BUILDER, FilterItemFactory } from './factory/filter-item.factory';
import {
  ProjectBuilder,
  IssueTypeBuilder,
  IssueStatusBuilder,
  AssigneeBuilder,
  IssuePriorityBuilder,
  ReporterBuilder
} from './builders/select.builders';
import { SearchStringItemBuilder } from './builders/input.builder';
import { AbstractSelectFormComponent } from './abstract-select-form/abstract-select-form.component';
import { AssigneeFormComponent } from './assignee-form/assignee-form.component';
import { ReporterFormComponent } from './reporter-form/reporter-form.component';

const BUILDERS = [
  { provide: FILTER_ITEM_BUILDER, useClass: SearchStringItemBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: ProjectBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssueTypeBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssueStatusBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssuePriorityBuilder, multi: true},
  { provide: FILTER_ITEM_BUILDER, useClass: AssigneeBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: ReporterBuilder, multi: true }
]

@NgModule({
  declarations: [CreateFilterComponent, AbstractSelectFormComponent, AssigneeFormComponent, ReporterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [
    BUILDERS,
    FilterItemFactory
  ],
  exports: [CreateFilterComponent]
})
export class FilterFormModule { }
