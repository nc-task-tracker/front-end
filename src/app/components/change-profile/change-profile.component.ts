import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {saveProfileAction} from "../../store/actions/change-profile.actions";


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  changeProfileForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private ngRedux: NgRedux<AppState>) {

  }
  onCancelClick() {
    this.router.navigate(['profile']);
  }
  ngOnInit() {
    this.changeProfileForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      skype: [''],
      telephone: [''],
      additional: [''],
      birthday: [''],
      description: ['']
    });
  }

 changeProfile() {
    const formValue = this.changeProfileForm.getRawValue();
    this.ngRedux.dispatch(saveProfileAction(formValue));
  }
}
