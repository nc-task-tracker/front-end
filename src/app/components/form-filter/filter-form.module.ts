import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule,
  MatAutocompleteModule, MatChipsModule, MatIconModule, MatListModule, MatTableModule
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatDividerModule} from '@angular/material/divider'
import { FILTER_ITEM_BUILDER, FilterItemFactory } from './factory/filter-item.factory';
import {
  ProjectNameBuilder,
  IssueTypeBuilder,
  IssueStatusBuilder,
  AssigneeBuilder,
  IssuePriorityBuilder,
  ReporterBuilder,
  IssueNameBuilder
} from './builders/select.builders';
import { SearchStringItemBuilder } from './builders/input.builder';
import { AbstractSelectFormComponent } from './abstract-select-form/abstract-select-form.component';
import { AssigneeFormComponent } from './assignee-form/assignee-form.component';
import { TicketNameFormComponent } from './ticket-name-form/ticket-name-form.component';
import { TicketsPageComponent } from './tickets-page/tickets-page.component';
import {ProjectNameFormComponent} from "./project-name-form/project-name-form.component";

const BUILDERS = [
  { provide: FILTER_ITEM_BUILDER, useClass: SearchStringItemBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: ProjectNameBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssueTypeBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssueStatusBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssuePriorityBuilder, multi: true},
  { provide: FILTER_ITEM_BUILDER, useClass: AssigneeBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: ReporterBuilder, multi: true },
  { provide: FILTER_ITEM_BUILDER, useClass: IssueNameBuilder, multi: true }
]

@NgModule({
  declarations: [
    FilterFormComponent,
    AbstractSelectFormComponent,
    AssigneeFormComponent,
    TicketNameFormComponent,
    TicketsPageComponent,
    ProjectNameFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [
    BUILDERS,
    FilterItemFactory
  ],
  exports: [FilterFormComponent, MatTableModule]
})
export class FilterFormModule { }
