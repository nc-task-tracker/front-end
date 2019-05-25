import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../models/user.model';
import {SearchByName} from '../components/form-filter/abstract-select-form/abstract-select-form.component';
import {Ticket} from '../models/ticket.model';
import {Assignee} from '../models/assignee.model';
import {Project} from '../models/project.model';

@Injectable()
export class UserService implements SearchByName<Assignee> {

  private USERS_URL = '/api/users';
  private SEARCH_USERS_BY_STRING = '/api/users/assignee';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.USERS_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getAssigneeList(inputValue: string): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(`${this.USERS_URL}`, {
      params: {
        name: inputValue
      }
    });
  }

  searchByName(inputValue: string): Observable<Assignee[]> {
    if (!inputValue) {
      return this.http.get<Assignee[]>(`${this.SEARCH_USERS_BY_STRING}`, {
        params: {
          name: ''
        }
      });
    } else {
      return this.http.get<Assignee[]>(`${this.SEARCH_USERS_BY_STRING}`, {
        params: {
          name: inputValue
        }
      });
    }
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.USERS_URL}/${userId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.USERS_URL}`, user)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getNotProjectAssigners(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.USERS_URL}/noassigner/project/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
