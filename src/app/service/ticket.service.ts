import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Ticket, Ticket_1} from '../models/ticket.model';

@Injectable()
export class TicketService {

  constructor() { }

  // noinspection JSAnnotator
  getTicket(): Ticket {
    return Ticket_1;
  }
}
