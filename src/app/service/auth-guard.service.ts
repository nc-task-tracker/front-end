import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(public auth: AuthService, public router: Router){}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      localStorage.setItem('currentUser', null);
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
