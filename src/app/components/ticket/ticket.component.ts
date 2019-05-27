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
import {Comment} from '../../models/comment.model';
import {TicketPriority} from '../../models/Enums/TicketPriority.enum';
import {TicketStatus} from '../../models/Enums/TicketStatus.enum';
import {Assignee} from '../../models/assignee.model';
import {Project} from '../../models/project.model';
import {TicketType} from '../../models/Enums/TicketType.enum';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketForm: FormGroup;

  priorities = allTicketPriority;
  statuses = allTicketStatus;
  types = allTicketType;
  valueTitleKeyAssignee = 'login';
  assigneePlaceholder = 'Choose assignee';
  isShowFullName = true;


  edit: boolean = true;

  @select(selectCurrentIsLoading)
  isLoading: Observable<boolean>;

  ticket: Ticket;
  ticketId: string;
  createSubtask = false;
  ticketSubtasks;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const ticketCode = this.route.snapshot.params.issueCode;
    this.ngRedux.dispatch(selectTicket(ticketCode));

    this.isLoading.subscribe( val => {
      if(!val) {
      this.ticket = selectCurrentTicket(this.ngRedux.getState());
      this.ticketId = this.ticket.id;
      this.ticketSubtasks = this.ticket.subtasks;
      console.log(this.ticketSubtasks.length);
      this.formInit();
      }})
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
      reporter: [this.ticket.reporter],
      assignee: [this.ticket.assignee.login, Validators.required],
      parentId: [this.ticket.parentId],
      subtasks: [this.ticket.subtasks],
      comments: [this.ticket.comments]
    });
  }

  onUpdateClick() {
    this.ngRedux.dispatch(updateTicketAction(this.ticketForm.getRawValue(), '1'));
  }

  onDeleteClick() {
    this.router.navigate([`/project/${this.ticket.project.id}`]);
    this.ngRedux.dispatch(deleteTicketAction(this.ticket.id));

  }

  onEditClick() {
    this.edit = !this.edit;
  }
}
