import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalUserStorageService} from '../service/global-storage.service';
import {CurrentUserEpic} from "../store/epics/current-user.epic";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storageService: GlobalUserStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.storageService.currentUser;
    let token = this.storageService.currentToken.token;
    if (currentUser && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
