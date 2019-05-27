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
import {Router} from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CreateTicketModalComponent} from '../create-ticket-modal/create-ticket-modal.component';
import { NgRedux, select } from '@angular-redux/store';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store';
import {selectCurrentUser, selectCurrentUserName} from 'src/app/store/selectors/current-user.selector';
import { logoutUserAction } from 'src/app/store/actions/current-user.actions';
import { LoginUserComponent } from '../dialogs/login-user/login-user.component';
import {MatDialog, MatMenuTrigger} from '@angular/material';
import {Router} from "@angular/router";
import {CreateTicketModalComponent} from "../create-ticket-modal/create-ticket-modal.component";
import {FormBuilder} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";
import {Assignee} from "../../models/assignee.model";
import {DashboardService} from "../../service/dashboard.service";
import {Dashboard} from "../../models/dashboard.model";
import {GlobalUserStorageService} from "../../service/global-storage.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  currentUser: Observable<User>;

  currentDashboard: Dashboard;
  currentDashboardId: String;

  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  dashboards$: Observable<Dashboard[]>;

  constructor(private ngRedux: NgRedux<AppState>,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private router: Router,
              private dashboardService : DashboardService,
              private storageService: GlobalUserStorageService) {
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

  createTicket() {
    this.matDialog.open(CreateTicketModalComponent);
  }

  chooseDashboard(dashboard_id: string) {
    this.dashboards$ = null;
    this.currentDashboardId = dashboard_id;
    this.router.navigate(['home']);
  }

  getAllDashboard() {
    this.dashboards$ = this.dashboardService.getDashboardList(this.storageService.currentUser.id);
  }
}
