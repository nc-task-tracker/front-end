import {NgRedux, select} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {AppState} from 'src/app/store';
import {
  selectCurrentUser,
  selectCurrentUserName
} from 'src/app/store/selectors/current-user.selector';
import {logoutUserAction} from 'src/app/store/actions/current-user.actions';
import {LoginUserComponent} from '../dialogs/login-user/login-user.component';
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>, private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {

  }

  onLoginClick() {
    this.matDialog.open(LoginUserComponent);
  }

  onLogoutClick() {
    this.ngRedux.dispatch(logoutUserAction());
    this.router.navigate(['home']);
  }
}
