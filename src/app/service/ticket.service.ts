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
import {select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../store/selectors/current-user.selector';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {SearchByName} from "../components/form-filter/abstract-select-form/abstract-select-form.component";
import {Filter} from "../models/filter-item.model";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';

@Injectable()
export class TicketService implements SearchByName<Ticket>{

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private readonly ISSUE_URL = '/api/issue';
  private readonly GET_USERS = '/api/users/assignee';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';
  private readonly SEARCH_BY_NAME = '/api/issue/searchByName';
  private readonly SEARCH_TICKETS = '/api/issue/search/';

  constructor(private http: HttpClient) { }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.ISSUE_URL}`, ticket)
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

  searchByName(name : string ): Observable<Ticket[]> {
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

  updateTicket(ticket: Ticket, ticketId: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.ISSUE_URL}/${ticketId}`, ticket)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteTicket(id: string): Observable<{}> {
    return this.http.delete(`${this.ISSUE_URL}/delete/${id}`)
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
