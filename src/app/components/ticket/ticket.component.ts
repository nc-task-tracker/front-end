import { Component, OnInit } from '@angular/core';
import {allTicketPriority, allTicketStatus, allTicketType, Ticket} from '../../models/ticket.model';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {TicketService} from '../../service/ticket.service';
import {deleteTicketAction, updateTicketAction} from '../../store/actions/tickets.actions';

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
  ticket: Ticket;
  editName: boolean = false;
  editAssignee: boolean = false;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.ticket = this.ticketService.getTicket();

    this.ticketForm = this.fb.group({
      id: [this.ticket.id],
      issueName: [this.ticket.issueName],
      issueType: [this.ticket.issueType],
      issuePriority: [this.ticket.issuePriority],
      issueStatus: [this.ticket.issueStatus],
      dueDate: [this.ticket.dueDate],
      issueDescription: [this.ticket.issueDescription],
      assigner: [this.ticket.assigner.name]
    });
  }

  onUpdateClick() {
    this.ngRedux.dispatch(updateTicketAction(this.ticketForm.getRawValue()));
  }

  onDeleteClick() {
    this.ngRedux.dispatch(deleteTicketAction(this.ticket.id));
  }
}
