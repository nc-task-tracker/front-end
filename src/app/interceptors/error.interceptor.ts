import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {AuthService} from '../service/auth.service';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private readonly AUTHENTICATION_ERROR_CODE = 401;
  private readonly INTERNAL_SERVER_ERROR_CODE = 500;
  private readonly PAGE_NOT_FOUND_ERROR_CODE = 404;
  constructor(private authenticationService: AuthService, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === this.INTERNAL_SERVER_ERROR_CODE) {
        this.router.navigate(['500']);
      }
      if (err.status === this.PAGE_NOT_FOUND_ERROR_CODE) {
        this.router.navigate(['404']);
      }
      if (err.status === this.AUTHENTICATION_ERROR_CODE) {
        this.router.navigate(['401']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
