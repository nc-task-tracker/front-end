import {NgRedux} from '@angular-redux/store';
import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {AppState} from '../../store';
import {registerAction} from 'src/app/store/actions/register.action';
import {Router} from '@angular/router';
import {UserNameValidator} from "../../validators/user.name.validator";
import {UserEmailValidator} from "../../validators/user.email.validator";

@Component({
  selector: 'app-edit-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  hide = true;

  constructor(private ngRedux: NgRedux<AppState>, private fb: FormBuilder, private router: Router,
              private userNameValidator: UserNameValidator, private userEmailValidator: UserEmailValidator) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(){
    this.userForm = this.fb.group({
      login: ['', {
        validators: [Validators.required],
        asyncValidators: [this.userNameValidator]
      }],
      password: ['', Validators.required],
      email: ['', {
        validators: [Validators.email],
        asyncValidators: [this.userEmailValidator]
      }]
    });
  }

  onRegisterClick() {
    this.ngRedux.dispatch(registerAction(this.userForm.getRawValue()));
    // this.onCancelClick();
  }

  get login(): FormControl {
    return this.userForm.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.userForm.get(controlName) as FormControl;
    return this.getErrorMessage(control, controlName);
  }

  onCancelClick() {
    this.router.navigate(['home']);
  }

  private getErrorMessage(control: FormControl, controlName: string): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Field is required';
        return errorMessage;
      }
      if (control.errors['email']) {
        errorMessage = 'Incorrect email';
        return errorMessage;
      }
      if (controlName == "login" && this.userNameValidator.validate(control)) {
        errorMessage = 'Already exist'
        return errorMessage;
      }
      if (controlName == "email" && this.userEmailValidator.validate(control)) {
        errorMessage = 'Already exist'
        return errorMessage;
      }
    }
  }
}
