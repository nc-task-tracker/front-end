import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux, select} from "@angular-redux/store";
import {selectCurrentUser, selectCurrentUserName} from "../../store/selectors/current-user.selector";
import {Observable, of} from "rxjs";
import {Assignee} from "../../models/assignee.model";
import {User} from "../../models/user.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {allTicketPriority, allTicketTypes} from "../../models/ticket.model";
import {AppState} from "../../store";
import {Router} from "@angular/router";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TicketService} from "../../service/ticket.service";
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";
import {Project} from "../../models/project.model";
import {createTicketAction} from "../../store/actions/create-ticket.actions";
import {createDashboardAction} from "../../store/actions/create-dashboard.actions";
import {Dashboard} from "../../models/dashboard.model";
import {dashboardUser} from "../../store/selectors/dashboard.selector";

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.css']
})
export class CreateDashboardComponent implements OnInit {
  dashboardForm: FormGroup;

  @select(dashboardUser)
  newDashboard: Observable<Dashboard>;

  constructor(private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder,
              private router: Router,
              private storageService: GlobalUserStorageService) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.dashboardForm = this.fb.group({
      name: ['', Validators.required],
      user: this.storageService.currentUser
    });
  }

  onCreateClick() {
    const formValue = this.dashboardForm.getRawValue();
    this.ngRedux.dispatch(createDashboardAction(formValue as any));
    this.router.navigate(['dashboard', t.]);
  }

  onCancelClick() {
    this.router.navigate(['home']);     //todo: Projects page
  }

  get name(): FormControl {
    return this.dashboardForm.get('name') as FormControl;
  }

  private getErrorMessage(control: FormControl): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Field is required';
      }
    }
    return errorMessage;
  }

  getErrorText(controlName: string): string {
    const control = this.dashboardForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }
}
