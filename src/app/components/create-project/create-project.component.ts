import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {Router} from "@angular/router";
import {createProjectAction} from "../../store/actions/create-project.actions";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {ProjectNameValidator} from "../../validators/project.name.validator";
import {ProjectCodeValidator} from "../../validators/project.code.validator";

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;


  constructor(private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router,
              private storageService: GlobalUserStorageService,
              private projectNameValidator: ProjectNameValidator,
              private projectCodeValidator: ProjectCodeValidator) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', {
        validators: [Validators.required],
        asyncValidators: [this.projectNameValidator]
      }],
      projectDescription: [''],
      projectCode: ['', {
        validators: [Validators.required, Validators.maxLength(5),
          Validators.minLength(3), Validators.pattern('[A-Z]+')],
        asyncValidators: [this.projectCodeValidator]
      }],
      ownerId: this.storageService.currentUser.id
    });
  }

  onCreateClick() {
    const formValue = this.projectForm.getRawValue();
    this.ngRedux.dispatch(createProjectAction(formValue as any));
    this.onCancelClick();
  }

  onCancelClick() {
    this.router.navigate(['projects']);     //todo: Projects page
  }

  get projectName(): FormControl {
    return this.projectForm.get('projectName') as FormControl;
  }

  get projectCode(): FormControl {
    return this.projectForm.get('projectCode') as FormControl;
  }

  get projectDescription(): FormControl {
    return this.projectForm.get('projectDescription') as FormControl;
  }


  private getErrorMessage(control: FormControl, controlName: string): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Field is required';
        return errorMessage;
      }
      if (control.errors['maxlength'] || control.errors['minlength']) {
        errorMessage = 'Code should be 3-5 length';
        return errorMessage;
      }
      if (control.errors['pattern']) {
        errorMessage = 'Only uppercase letters';
        return errorMessage;
      }
      if (controlName == "projectName" && this.projectNameValidator.validate(control)){
        errorMessage = 'Already exist'
        return errorMessage;
      }
      if (controlName == "projectCode" && this.projectCodeValidator.validate(control)){
        errorMessage = 'Already exist'
        return errorMessage;
      }
    }
  }

  getErrorText(controlName: string): string {
    const control = this.projectForm.get(controlName) as FormControl;
    return this.getErrorMessage(control, controlName);
  }
}
