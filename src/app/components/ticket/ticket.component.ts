import { Component, OnInit } from '@angular/core';
import {allTicketPriority, TicketStatus, allTicketTypes, Ticket} from '../../models/ticket.model';
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
  statuses = TicketStatus;
  types = allTicketTypes;

  ticket: Ticket;

  constructor(private ticketService: TicketService,
              private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    //this.ticket = this.ticketService.getTicket();
  }
}
