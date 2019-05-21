import {ProjectService} from "../service/project.service";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable()
export class ProjectNameValidator implements AsyncValidator {

  constructor(private projectService: ProjectService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const trimedValue = (<string>control.value).trim();
    return this.projectService.searchProject(trimedValue)
      .pipe(
        map(projects => projects.filter(el => el.projectName === trimedValue).length ? {name: {value: trimedValue}} : null)
      )
  }
}
