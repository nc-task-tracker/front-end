import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import {MaterialModule} from '../../material.module';
import {TicketComponent} from './ticket.component';
import {CommentsComponent} from './comments/comments.component';
import { SubtasksComponent } from './subtasks/subtasks.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {AssigneeFormComponent} from '../form-filter/assignee-form/assignee-form.component';
import {FilterFormModule} from '../form-filter/filter-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    MatTableModule,
    OverlayModule,
    FilterFormModule
  ],
  declarations: [TicketComponent, CommentsComponent, SubtasksComponent],
  entryComponents: [TicketComponent, CommentsComponent, SubtasksComponent]
})
export class TicketModule { }
