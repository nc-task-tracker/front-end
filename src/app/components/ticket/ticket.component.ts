import { Component, OnInit } from '@angular/core';
import {allTicketPriority, allTicketStatus, allTicketType, Ticket, Ticket_1} from '../../models/ticket.model';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TicketService} from "../../service/ticket.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  priorities = allTicketPriority;
  statuses = allTicketStatus;
  types = allTicketType;

  ticket: Ticket;

  constructor(private ticketService: TicketService,
              private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    //this.ticket = this.ticketService.getTicket();
  }
}
