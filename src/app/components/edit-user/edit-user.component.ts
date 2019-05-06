import {NgRedux} from '@angular-redux/store';
import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {AppState} from 'src/app/store/index';
import {createUserAction} from 'src/app/store/actions/users.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  asyncUser: Observable<User>;

  hide = true;

  constructor(private ngRedux: NgRedux<AppState>, private fb: FormBuilder,
              private router: Router
              ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  onRegisterClick() {
    this.ngRedux.dispatch(createUserAction(this.userForm.getRawValue()));
    this.onCancelClick();
  }

  // passwordValidator(form: FormGroup) {
  //     const password: string = form.controls.get('password').value;
  //     const passwordConfirmed: string = form.controls.get('confirmPassword').value;
  //     // if (password !== passwordConfirmed) {
  //     //   form.controls.get('confirmPassword').inv
  //     // }
  //   }

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.userForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  onCancelClick() {
    this.router.navigate(['users']);
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
}
