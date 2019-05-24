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

  edit: boolean = true;

  @select(selectCurrentIsLoading)
  isLoading: Observable<boolean>;

  ticket: Ticket;
  ticketId: string;
  haveComments: boolean = false;
  ticketComments;

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
      this.ticketComments = this.ticket.comments;
      if (this.ticketComments.length !== 0) this.haveComments = true;
      this.formInit();
      }})
  }

  formInit() {
    this.ticketForm = this.fb.group({
      issueName: [this.ticket.issueName],
      issueType: [this.ticket.issueType, Validators.required],
      issuePriority: [this.ticket.issuePriority, Validators.required],
      issueStatus: [this.ticket.issueStatus, Validators.required],
      // assignee: [this.ticket.assignee.firstName],
      dueDate: [this.ticket.dueDate, Validators.required],
      issueDescription: [this.ticket.issueDescription]
    });
  }

  onUpdateClick() {
    this.ngRedux.dispatch(updateTicketAction(this.ticketForm.getRawValue(), '1'));
  }

  onDeleteClick() {
    this.ngRedux.dispatch(deleteTicketAction(this.ticket.id));
    this.router.navigate(['home'])
  }

  onEditClick() {
    this.edit = !this.edit;
  }
}
