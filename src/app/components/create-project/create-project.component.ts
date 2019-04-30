import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {Project} from "../../models/project.model";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {Router} from "@angular/router";
import {createProjectAction} from "../../store/actions/create-project.actions";
import {GlobalUserStorageService} from "../../service/global-storage.service";

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
              private storageService: GlobalUserStorageService) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      ownerId: this.storageService.currentUser.id
    });
  }

  onCreateClick() {
    const formValue = this.projectForm.getRawValue();
    this.ngRedux.dispatch(createProjectAction(formValue as any));
    // this.onCancelClick();
  }

  onCancelClick() {
    this.router.navigate(['projects']);     //todo: Projects page
  }

  get projectName(): FormControl {
    return this.projectForm.get('projectName') as FormControl;
  }

  get projectDescription(): FormControl {
    return this.projectForm.get('projectDescription') as FormControl;
  }


  private getErrorMessage(control: FormControl): string {
    let errorMesage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMesage = 'Field is required';
      }
    }
    return errorMesage;
  }

  getErrorText(controlName: string): string {
    const control = this.projectForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }
}
