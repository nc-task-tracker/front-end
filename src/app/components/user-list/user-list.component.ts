import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { fetchUsersAction } from 'src/app/store/actions/users.actions';
import { isLoading, selectUsers } from 'src/app/store/selectors/users.selector';
import { User } from '../../models/user.model';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>) {}

  ngOnInit() {
    this.ngRedux.dispatch(fetchUsersAction());
  }
}
