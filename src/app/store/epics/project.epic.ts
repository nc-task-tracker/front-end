import {Injectable} from "@angular/core";
import {ProjectService} from "../../service/project.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {CREATE_PROJECT, createProjectSuccessAction} from "../actions/create-project.actions";
import {of} from "rxjs";

@Injectable()
export class ProjectEpic {
  constructor(private projectService: ProjectService){}

  createProject$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_PROJECT).pipe(
      switchMap(({payload}) => {
        return this.projectService
          .createProject(payload.project)
          .pipe(
            mergeMap( project => of(createProjectSuccessAction(project)))
          );
      })
    );
  }
}
