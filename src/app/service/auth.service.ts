import { Injectable } from '@angular/core';
import { Credential } from '../models/credentials.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

    private LOGIN_URL = '/api/login';

    constructor(private http: HttpClient) {
    }

    login(credential: Credential): Observable<User> {
        return this.http.post<User>(`${this.LOGIN_URL}`, credential)
        .pipe(catchError((error: any) => throwError(error.error)));
    }

    logout() {
    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
