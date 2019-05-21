import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {allTicketPriority} from '../../models/ticket.model';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import {createTicketAction} from '../../store/actions/tickets.actions';
import {TicketPriority} from '../../models/Enums/TicketPriority.enum';


@Component({
  selector: 'app-create-ticket-page',
  templateUrl: './create-ticket-page.component.html',
  styleUrls: ['./create-ticket-page.component.css']
})
export class CreateTicketPageComponent implements OnInit {

  ticketForm: FormGroup;
  allTicketPriority = allTicketPriority;

  constructor(private fb: FormBuilder,
              private ngRedux: NgRedux<AppState>) {
  }


  ngOnInit() {
     this.ticketForm = this.fb.group({
          issueName: [''],
          issueType: [''],
          priority: [TicketPriority.MINOR],
          issueDescription: [''],
          assignee: []
     });
  }

  createTicket() {
     const formValue = this.ticketForm.getRawValue();
     this.ngRedux.dispatch(createTicketAction(formValue));
  }
}


