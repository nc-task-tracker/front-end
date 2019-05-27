import { Injectable } from '@angular/core';
import { Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {Assignee} from '../models/assignee.model';
import {select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../store/selectors/current-user.selector';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {SearchByName} from '../components/form-filter/abstract-select-form/abstract-select-form.component';
import {Filter} from '../models/filter-item.model';
import {TablePageData} from '../models/util/table-page-data.model';
import {SortParameters} from '../models/util/table-sort-param.model';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {selectCurrentTicket} from '../store/selectors/current-ticket.selector';

@Injectable()
export class TicketService implements SearchByName<Ticket> {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private readonly CREATE_URL = '/api/issue/project';
  private readonly GET_USERS = '/api/users/assignee';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';
  private readonly ISSUE_URL = '/api/issue';
  private readonly TICKET_URL = '/api/issue';
  private readonly SEARCH_BY_NAME = '/api/issue/searchByName';
  private readonly SEARCH_TICKETS = '/api/issue/search/';

  @select(selectCurrentTicket)
  curTicket: Observable<Ticket>;

  constructor(private http: HttpClient) {
  }

  // createTicket(ticket: Ticket): Observable<Ticket> {
  //   console.log('we are here');
  //   return this.http.post<Ticket>(`${this.CREATE_URL}`, ticket)
  //     .pipe(catchError(err => throwError(err)));
  // }

  searchByName(name: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.SEARCH_BY_NAME}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  // getTablePageData(parameters: SortParameters): Observable<TablePageData<Project>>{
  //   return this.http.post<TablePageData<Project>>(`${this.PROJECT_URL}/all/sorted`,parameters)
  //     .pipe(catchError((error: any) => throwError(error.error)));
  // }

  searchByFilter(filter: Filter): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.SEARCH_TICKETS}`, filter)
      .pipe(catchError(err => throwError(err)));
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    const projectId = ticket.project.id;
    return this.http.post<Ticket>(`${this.CREATE_URL}${projectId}`, ticket)
      .pipe(catchError(err => throwError(err)));
  }
  getPossibleProjectsByUser(userName: string) {
    return this.http.get<Project[]>(`${this.GET_PROJECTS}`, {
      params: {
        name: userName
      }
    });
  }

  searchByString(name: string): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(`${this.GET_USERS}`, {
      params: {
        name: name
      }
    });
  }

  getTicketsByProjectId(projectId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.TICKET_URL}/project/${projectId}`)
      .pipe(catchError(err => throwError(err)));
  }

  getTablePageData(projectId: string, sort: SortParameters): Observable<TablePageData<Ticket>> {
    return this.http.post<TablePageData<Ticket>>(`${this.TICKET_URL}/project/${projectId}/sort`, sort)
      .pipe(catchError(err => throwError(err)));
  }

  deleteTicket(id: string): Observable<{}> {
    return this.http.delete(`${this.ISSUE_URL}/delete/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteTicketComment(commentId: string): Observable<{}> {
    return this.http.delete(`${this.ISSUE_URL}/deleteComment/${commentId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateTicket(ticket: Ticket, ticketId: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.ISSUE_URL}/${ticketId}`, ticket)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  saveComment(comment: Comment, ticketId: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.ISSUE_URL}/${ticketId}/saveComment`, comment)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ISSUE_URL}/${ticketId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ISSUE_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
