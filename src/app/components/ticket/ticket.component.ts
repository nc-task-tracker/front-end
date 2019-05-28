import { Component, OnInit } from '@angular/core';
import {allTicketPriority, allTicketStatus, allTicketType, Ticket} from '../../models/ticket.model';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../service/ticket.service';
import {Observable} from 'rxjs';
import {selectCurrentIsLoading, selectCurrentTicket} from '../../store/selectors/current-ticket.selector';
import {deleteTicketAction, selectTicket, updateTicketAction} from '../../store/actions/tickets.actions';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../service/profile.service';
import {takeUntil} from 'rxjs/operators';
import {Project} from '../../models/project.model';
import {AutoUnsubscribe} from '../../service/auto-unsubscribe';
import {CreateTicketModalComponent} from '../create-ticket-modal/create-ticket-modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent extends AutoUnsubscribe implements OnInit {

  ticketForm: FormGroup;
  priorities = allTicketPriority;
  statuses = allTicketStatus;
  types = allTicketType;
  valueTitleKeyAssignee = 'login';
  isShowFullName = true;
  reporterName: string;
  assigneeName: string;

  edit: boolean = true;

  @select(selectCurrentIsLoading)
  isLoading: Observable<boolean>;

  ticket: Ticket;
  ticketId: string;
  createSubtask = false;
  ticketSubtasks;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private profileService: ProfileService) {
    super();
  }

  ngOnInit() {
    const ticketCode = this.route.snapshot.params.issueCode;
    this.ngRedux.dispatch(selectTicket(ticketCode));

    this.isLoading.subscribe( val => {
      if(!val) {
      this.ticket = selectCurrentTicket(this.ngRedux.getState());
      this.ticketId = this.ticket.id;
      this.ticketSubtasks = this.ticket.subtasks;
      this.getReporterAssigneeProfile(this.ticket.reporterId, this.ticket.assigneeId);
      this.formInit();
      }});
  }

  getReporterAssigneeProfile(reporterId: string, assigneeId: string) {
    this.profileService.getProfile(reporterId).pipe(takeUntil(this.streamEndSubject))
      .subscribe(profile => {
        this.reporterName = profile.user.login;
      });

    this.profileService.getProfile(assigneeId).pipe(takeUntil(this.streamEndSubject))
      .subscribe(profile => {
        this.assigneeName = profile.user.login;
      });
  }

  formInit() {
    this.ticketForm = this.fb.group({
      issueName: [this.ticket.issueName, Validators.required],
      issueType: [this.ticket.issueType, Validators.required],
      issuePriority: [this.ticket.issuePriority, Validators.required],
      issueStatus: [this.ticket.issueStatus, Validators.required],
      dueDate: [this.ticket.dueDate, Validators.required],
      issueDescription: [this.ticket.issueDescription, Validators.required],
      code: [this.ticket.code],
      startDate: [this.ticket.startDate],
      project: [this.ticket.project],
      reporterId: [this.ticket.reporterId],
      assignee: ['', Validators.required],
      parentId: [this.ticket.parentId],
      subtasks: [this.ticket.subtasks],
      comments: [this.ticket.comments]
    });
  }

  onUpdateClick() {
    this.ngRedux.dispatch(updateTicketAction(this.ticketForm.getRawValue(), this.ticketId));
  }

  onEditClick() {
    this.edit = !this.edit;
  }
}

