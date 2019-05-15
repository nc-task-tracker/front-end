import { Component, OnInit } from '@angular/core';
import {allTicketPriority, allTicketStatus, allTicketType, defaultTicket, Ticket} from '../../models/ticket.model';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../service/ticket.service';
import {Observable} from 'rxjs';
import {
  selectTickets
} from '../../store/selectors/tickets.selector';
import {updateCurrentTicketAction} from '../../store/actions/current-ticket.action';
import {selectCurrentIsLoading, selectCurrentTicket} from '../../store/selectors/current-ticket.selector';
import {deleteTicketAction, selectTicket} from '../../store/actions/tickets.actions';

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

  editName: boolean = true;
  editAssignee: boolean = true;

  @select(selectCurrentIsLoading)
  isLoading: Observable<boolean>;

  ticket: Ticket;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const ticketId = this.route.snapshot.params.id;
    this.ngRedux.dispatch(selectTicket(ticketId));

    this.isLoading.subscribe( val => {
      if(!val) {
      this.ticket = selectCurrentTicket(this.ngRedux.getState());
      this.formInit();
      }})
  }

  formInit() {
    this.ticketForm = this.fb.group({
      issueName: [this.ticket.issueName, Validators.required],
      issueType: [this.ticket.issueType, Validators.required],
      issuePriority: [this.ticket.issuePriority, Validators.required],
      issueStatus: [this.ticket.issueStatus, Validators.required],
      assignee: [this.ticket.assignee.FirstName, Validators.required],
      dueDate: [this.ticket.dueDate, Validators.required],
      issueDescription: [this.ticket.issueDescription]
    });
  }

  onUpdateClick() {
    this.ngRedux.dispatch(updateCurrentTicketAction(this.ticketForm.getRawValue()));
  }

  onDeleteClick() {
    this.ngRedux.dispatch(deleteTicketAction('2'));
    this.router.navigate(['home'])
  }
  // selectSubtask(taskId: string) {
  //    this.ngRedux.dispatch(updateRouterState(`/ticket/${taskId}`));
  // }
}
