
import { Injectable } from '@angular/core';
import {defaultTicket, Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable()
export class TicketService {

  private ISSUE_URL = '/api/issue';

  constructor(private http: HttpClient) { }

  getTicket(): Ticket {
    return defaultTicket;
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.ISSUE_URL}`, ticket)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteTicket(id: string): Observable<{}> {
    return this.http.delete(`${this.ISSUE_URL}/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
