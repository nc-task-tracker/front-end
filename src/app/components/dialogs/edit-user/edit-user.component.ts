import { NgRedux } from '@angular-redux/store';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserDialogData } from 'src/app/models/dialog-data.models';
import { DialogResult } from 'src/app/models/dialog-result';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store';
import { createUserAction, updateUserAction } from 'src/app/store/actions/users.actions';
import { selectUserById } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;

  maxDate = new Date();

  asyncUser: Observable<User>;
  title: string;
  private userId: string;

  constructor(private ngRedux: NgRedux<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) { }

  ngOnInit() {
    this.userId = this.data.userId;
    this.title = this.userId ? 'Edit User' : 'Create User';
    this.ngRedux.select(state => selectUserById(state, this.userId))
      .pipe(take(1))
      .subscribe(user => {
        this.initializeForm(user);
      });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {
        if (this.userId) {
          this.ngRedux.dispatch(updateUserAction({ ...result, id: this.userId }));
        } else {
          this.ngRedux.dispatch(createUserAction(result));
        }
      }
    });
  }

  private initializeForm(user: User) {
    this.userForm = this.fb.group({
      name: [user.name, Validators.required],
      dateOfBirth: [user.dateOfBirth],
      password: [user.password],
      email: [user.email, Validators.email]
    });
  }

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.userForm.get('dateOfBirth') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.userForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
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
