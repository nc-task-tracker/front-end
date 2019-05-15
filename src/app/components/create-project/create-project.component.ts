import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {Project} from "../../models/project.model";
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
  newProject: Observable<Project>;


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
        validators: [Validators.required],
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
    const control = this.projectForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }
}
