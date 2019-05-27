import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable()
export class UserService {

  private USERS_URL = '/api/users';
  private SEARCH_USERS_URL = '/api/authentication/register/search';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.USERS_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.USERS_URL}/${userId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.USERS_URL}`, user)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  searchUser(login?: string, email?: string): Observable<User[]> {
    let params = new HttpParams();
    if (login) {
      params = params.append('login', login);
    }
    if (email) {
      params = params.append('email', email)
    }
    return this.http.get<User[]>(this.SEARCH_USERS_URL, {
      params: params
    });
  }
}
