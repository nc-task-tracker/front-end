import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SortParameters} from "../models/util/table-sort-param.model";
import {TablePageData} from "../models/util/table-page-data.model";

@Injectable()
export class TicketService {

  private readonly TICKET_URL = '/api/issue';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
     return this.http.post<Ticket>(`${this.TICKET_URL}`, ticket)
       .pipe(catchError(err => throwError(err)));
  }


  getTicketsByProjectId(projectId: string): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.TICKET_URL}/project/${projectId}`)
      .pipe(catchError(err => throwError(err)));
  }

  getTablePageData(projectId: string, sort: SortParameters):Observable<TablePageData<Ticket>>{
    return this.http.post<TablePageData<Ticket>>(`${this.TICKET_URL}/project/${projectId}/sort`,sort)
      .pipe(catchError(err => throwError(err)));
  }

  deleteTicket(ticketId:string):Observable<{}>{
    return this.http.delete(`${this.TICKET_URL}/delete/${ticketId}`);
  }

}
