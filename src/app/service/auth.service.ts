import {Injectable} from '@angular/core';
import {Credential} from '../models/credentials.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {UserTokenModel} from "../models/user-token.model";
import  { JwtHelperService} from "@auth0/angular-jwt"
import {GlobalUserStorageService} from "./global-storage.service";


@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  private LOGIN_URL = '/api/authentication/login';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService,
              private localStorage: GlobalUserStorageService) {
  }

  login(credential: Credential): Observable<UserTokenModel> {
    return this.http.post<UserTokenModel>(`${this.LOGIN_URL}`, credential);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    const token = this.localStorage.currentToken;
    return token ? !this.jwtHelper.isTokenExpired(token.token): false;
  }
}
