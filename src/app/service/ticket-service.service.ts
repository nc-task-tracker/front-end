import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from "../models/user.model";
import {SearchModel} from "../models/search-model.model";
import {Filter, FilterItem} from "../models/filter-item.model";
import {SearchByName} from "../components/form-filter/abstract-select-form/abstract-select-form.component";


// TODO rename to TicketService
@Injectable()
export class TicketServiceService  {

  private readonly CREATE_URL = '/api/issue';

  private readonly TICKET_URL = '/api/issue/reporterName';
  private readonly SEARCH_TICKET = '/api/issue/search';
  private readonly SEARCH_BY_NAME = '/api/issue/searchByName';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
     return this.http.post<Ticket>(`${this.CREATE_URL}`, ticket)
       .pipe(catchError(err => throwError(err)));
  }



  // searchByName(name : string ): Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${this.SEARCH_BY_NAME}`)
  //     .pipe(catchError((error: any) => throwError(error.error)));
  // }
}
