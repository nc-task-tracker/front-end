import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogResult} from 'src/app/models/dialog-result';
import {AppState} from 'src/app/store';
import {loginUserAction} from 'src/app/store/actions/current-user.actions';
import {EditUserComponent} from '../../edit-user/edit-user.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  credentialForm: FormGroup;
  hide = true;

  constructor(private ngRedux: NgRedux<AppState>, private fb: FormBuilder,
              public dialogRef: MatDialogRef<LoginUserComponent>, private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {
        this.ngRedux.dispatch(loginUserAction(result));
      }
    });
  }

  get login() {
    return this.credentialForm.get('login') as FormControl;
  }

  get password() {
    return this.credentialForm.get('password') as FormControl;
  }

  private initializeForm() {
    this.credentialForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  onCreateUserClick() {
    this.matDialog.open(EditUserComponent, {
      width: '550px',
      height: '400px',
      data: {userId: null}
    });
  }

  getErrorText(controlName: string): string {
    const control = this.credentialForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  private getErrorMessage(control: FormControl): string {
    let errorMesage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMesage = 'Field is required';
      }
      if (control.errors['email']) {
        errorMesage = 'Incorrect email';
      }
    }
    return errorMesage;
  }

  onRegisterClick() {
    this.onCancelClick();
    // this.dialogRef.close(DialogResult.CLOSE);
    setTimeout(() => this.router.navigate(['register']));
  }
}
