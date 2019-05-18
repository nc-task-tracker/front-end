
import { Injectable } from '@angular/core';
import { Ticket} from '../models/ticket.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {selectCurrentUser, selectCurrentUserName} from '../store/selectors/current-user.selector';
import {Project} from '../models/project.model';
import {select} from '@angular-redux/store';
import {Assignee} from '../models/assignee.model';

@Injectable()
export class TicketService {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private ISSUE_URL = '/api/issue';
  private readonly GET_USERS = '/api/users/assignee';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';

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
    console.log(userName);
    return this.http.get<Project[]>(`${this.GET_PROJECTS}`, {
      params: {
        name: userName
      }
    });
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

  // getTicketInComponent(): Observable<Ticket> {
  //   return ticket;
  // }
}
