import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {ProjectService} from "../service/project.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class ProjectCodeValidator implements AsyncValidator {

  constructor(private projectService: ProjectService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const trimedValue = (<string>control.value).trim();
    return this.projectService.searchProject(null, trimedValue)
      .pipe(
        map(projects => projects.filter(el => el.projectCode === trimedValue).length ? {name: {value: trimedValue}} : null)
      )
  }
}
