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
import {SearchByName} from '../components/form-filter/abstract-select-form/abstract-select-form.component';
import {Filter} from '../models/filter-item.model';
import {TablePageData} from '../models/util/table-page-data.model';
import {SortParameters} from '../models/util/table-sort-param.model';

@Injectable()
export class TicketService implements SearchByName<Ticket> {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  private readonly CREATE_URL = '/api/issue/project/';
  private readonly SEARCH_BY_NAME = '/api/issue/searchByName';
  private readonly SEARCH_TICKETS = '/api/issue/search/';
  private readonly TICKET_URL = 'api/issue';


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

  getTicketsByProjectId(projectId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.TICKET_URL}/project/${projectId}`)
      .pipe(catchError(err => throwError(err)));
  }

  getTablePageData(projectId: string, sort: SortParameters): Observable<TablePageData<Ticket>> {
    return this.http.post<TablePageData<Ticket>>(`${this.TICKET_URL}/project/${projectId}/sort`, sort)
      .pipe(catchError(err => throwError(err)));
  }

  deleteTicket(ticketId: string): Observable<{}> {
    return this.http.delete(`${this.TICKET_URL}/delete/${ticketId}`);
  }

}
