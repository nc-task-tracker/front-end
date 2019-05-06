import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {throwError} from 'rxjs';
import {catchError, distinctUntilChanged, mergeMap} from 'rxjs/operators';
import {promise} from 'selenium-webdriver';
import map = promise.map;
import {Assignee} from '../models/assignee.model';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) {
  }


  private readonly CREATE_URL = '/api/issue';
  private readonly GET_USERS = '/api/users/assignee';


  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.CREATE_URL}`, ticket)
      .pipe(catchError(err => throwError(err)));
  }

  getAssigneeList(inputValue: string): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(`${this.GET_USERS}`, {
       params: {
         name: inputValue
       }
    });
  }

}
