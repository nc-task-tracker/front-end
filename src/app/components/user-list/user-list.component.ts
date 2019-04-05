import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalUserStorageService } from 'src/app/service/global-storage.service';
import { AppState } from 'src/app/store';
import { updateRouterState } from 'src/app/store/actions/router.actions';
import { fetchUsersAction } from 'src/app/store/actions/users.actions';
import { isLoading, selectUsers } from 'src/app/store/selectors/users.selector';
import { User } from '../../models/user.model';
import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';
import { EditUserComponent } from '../dialogs/edit-user/edit-user.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'password', 'dateOfBirth', 'email'];

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectUsers)
  users: Observable<User[]>;

  constructor(private ngRedux: NgRedux<AppState>, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.ngRedux.dispatch(fetchUsersAction());
  }

  onEditClick(userId: string) {
    this.matDialog.open(EditUserComponent, {
      width: '550px',
      height: '400px',
      data: { userId }
    });
  }

  selectUser(userId: string) {
    this.ngRedux.dispatch(updateRouterState(`/user/${userId}`));
  }

  onCreateUserClick() {
    this.matDialog.open(EditUserComponent, {
      width: '550px',
      height: '400px',
      data: { userId: null }
    });
  }

  onDeleteClick(userId: string) {
    this.matDialog.open(DeleteUserComponent, {
      data: { userId }
    });
  }

}
