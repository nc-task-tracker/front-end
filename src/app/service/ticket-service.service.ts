import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


// TODO rename to TicketService
@Injectable()
export class TicketServiceService {

  private readonly CREATE_URL = '/api/issue';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
     return this.http.post<Ticket>(`${this.CREATE_URL}`, ticket)
       .pipe(catchError(err => throwError(err)));
  }

}
