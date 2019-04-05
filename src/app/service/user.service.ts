import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    private USERS_URL = '/api/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.USERS_URL}`)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.USERS_URL}/${userId}`)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.USERS_URL}`, user)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.USERS_URL}`, user)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.USERS_URL}/${userId}`)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

}
