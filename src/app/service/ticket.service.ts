import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {promise} from 'selenium-webdriver';
import map = promise.map;
import {Assignee} from '../models/assignee.model';
import {select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../store/selectors/current-user.selector';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SortParameters} from "../models/util/table-sort-param.model";
import {TablePageData} from "../models/util/table-page-data.model";

@Injectable()
export class TicketService {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private readonly CREATE_URL = '/api/issue';
  private readonly GET_USERS = '/api/users/assignee';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';

  private readonly TICKET_URL = '/api/issue';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.TICKET_URL}`, ticket)
      .pipe(catchError(err => throwError(err)));
  }

  getAssigneeList(inputValue: string): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(`${this.GET_USERS}`, {
       params: {
         name: inputValue
       }
    });
  }

  getPossibleProjectsByUser(userName: string) {
    //console.log(userName);
    return this.http.get<Project[]>(`${this.GET_PROJECTS}`, {
      params: {
        name: userName
      }
    });
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
