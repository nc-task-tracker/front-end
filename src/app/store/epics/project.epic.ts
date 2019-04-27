import {Injectable} from "@angular/core";
import {ProjectService} from "../../service/project.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {CREATE_USER, createUserSuccessAction} from "../actions/users.actions";
import {map, switchMap} from "rxjs/operators";
import {CREATE_PROJECT, createProjectSuccessAction} from "../actions/create-project.actions";

@Injectable()
export class ProjectEpic {
  constructor(private projectService: ProjectService){}

  createProject$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_PROJECT).pipe(
      switchMap(({payload}) => {
        return this.projectService
          .createProject(payload.project)
          .pipe(
            map( project => createProjectSuccessAction(project))
          );
      })
    );
  }
}
