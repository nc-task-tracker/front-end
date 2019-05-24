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

@Injectable()
export class TicketService implements SearchByName<Ticket>{

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  private readonly CREATE_URL = '/api/issue';
  private readonly GET_USERS = '/api/users/assignee';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';
  private readonly SEARCH_BY_NAME = '/api/issue/searchByName';
  private readonly SEARCH_TICKETS = '/api/issue/search/';


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
}
