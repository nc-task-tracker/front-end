import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import {Observable} from 'rxjs';
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: Observable<Ticket>;

  constructor() {}

  ngOnInit() {
  }
}
