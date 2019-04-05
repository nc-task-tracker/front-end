import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store';
import { selectCurrentUser } from 'src/app/store/selectors/current-user.selector';
import { logoutUserAction } from 'src/app/store/actions/current-user.actions';
import { LoginUserComponent } from '../dialogs/login-user/login-user.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>, private matDialog: MatDialog) { }

  ngOnInit() {
  }

  onLoginClick() {
     this.matDialog.open(LoginUserComponent);
  }

  onLogoutClick() {
    this.ngRedux.dispatch(logoutUserAction());
  }

}
