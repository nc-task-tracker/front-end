import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import {SearchByName} from "../components/form-filter/abstract-select-form/abstract-select-form.component";
import {Ticket} from "../models/ticket.model";

@Injectable()
export class UserService implements SearchByName<User>{

    private USERS_URL = '/api/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.USERS_URL}/all`)
            .pipe(catchError((error: any) => throwError(error.error)));
    }

    searchByName(name : string ): Observable<User[]> {
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

    getNotProjectAssigners(id: string):Observable<User[]>{
      return this.http.get<User[]>(`${this.USERS_URL}/noassigner/project/${id}`)
        .pipe(catchError((error: any) => throwError(error.error)));
    }
}
