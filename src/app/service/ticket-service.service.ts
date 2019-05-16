import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from "../models/user.model";
import {SearchModel} from "../models/search-model.model";
import {Filter, FilterItem} from "../models/filter-item.model";


// TODO rename to TicketService
@Injectable()
export class TicketServiceService {

  private readonly CREATE_URL = '/api/issue';

  private readonly TICKET_URL = '/api/issue/reporterName';
  private readonly SEARCH_TICKET = '/api/issue/search';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
     return this.http.post<Ticket>(`${this.CREATE_URL}`, ticket)
       .pipe(catchError(err => throwError(err)));
  }

  searchByFilter(filter: Filter): Observable<Ticket> {
     return this.http.post<Ticket>(`${this.CREATE_URL}`, filter)
       .pipe(catchError(err => throwError(err)));
  }
}
