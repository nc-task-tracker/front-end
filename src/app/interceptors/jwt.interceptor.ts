import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalUserStorageService} from '../service/global-storage.service';
import {CurrentUserEpic} from "../store/epics/current-user.epic";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storageService: GlobalUserStorageService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.storageService.currentUser;
    const token = this.storageService.currentToken;
    if (currentUser && token && token.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`
        }
      });
    }
    else {
      this.storageService.currentUser=null;
      this.storageService.currentToken=null;
      this.router.navigate(['home']);
    }

    return next.handle(request);
  }
}
