import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private USERS_URL = '/api/authentication/register';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this.USERS_URL}`, user)
      .pipe(catchError((error: any) => throwError(error.error)));
    }
}



