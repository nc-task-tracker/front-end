import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {saveProfileAction} from "../../store/actions/change-profile.actions";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {Profile} from "../../models/profile.model";
import {selectProfile, selectProfileIsLoading} from "../../store/selectors/profile.selector";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

import {ModalCancelComponent} from "../modal/modal-cancel/modal-cancel.component";
import {ModalSuccessComponent} from "../modal/modal-success/modal-success.component";

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  changeProfileForm: FormGroup;
  maxDate = new Date();

  profile: Profile;

  @select(selectProfileIsLoading)
  isLoading: Observable<boolean>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private storageService: GlobalUserStorageService,
              private matDialog: MatDialog,
              public dialogRef: MatDialogRef<ChangeProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  onCancelClick()  {
    this.matDialog.open(ModalCancelComponent);
  }
  changeProfile() {
    const formValue = this.changeProfileForm.getRawValue();
    this.ngRedux.dispatch(saveProfileAction(formValue));
    this.router.navigate(['profile/1']);
    this.matDialog.open(ModalSuccessComponent);
  }
  ngOnInit() {
    this.initializeForm();
    this.isLoading.subscribe( val => {
      console.log(val);
      if(!val) {
        this.profile = selectProfile(this.ngRedux.getState());
      }
    });
  }
  private initializeForm() {
    this.changeProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      skype: ['', Validators.required],
      telephone: ['', Validators.required],
      additional:['', Validators.required],
      birthday:['',Validators.required],
      description: ['', Validators.required],
      id: this.storageService.currentUser.id,
      maxDate: new Date()
  });
  }
  get fullName(): FormControl {
    return this.changeProfileForm.get('fullName') as FormControl;
  }
  get email(): FormControl {
    return this.changeProfileForm.get('email') as FormControl;
  }
  get skype(): FormControl {
    return this.changeProfileForm.get('skype') as FormControl;
  }
  get telephone(): FormControl {
    return this.changeProfileForm.get('telephone') as FormControl;
  }
  get additional(): FormControl {
    return this.changeProfileForm.get('additional') as FormControl;
  }
  get birthday(): FormControl {
    return this.changeProfileForm.get('birthday') as FormControl;
  }
  get description(): FormControl {
    return this.changeProfileForm.get('description') as FormControl;
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
  getErrText(controlName: string): string {
    const control = this.changeProfileForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }
}
