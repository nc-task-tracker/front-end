import {Injectable} from "@angular/core";
import {ProjectService} from "../../service/project.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {catchError, map, switchMap} from "rxjs/operators";
import {CREATE_PROJECT, createProjectSuccessAction} from "../actions/create-project.actions";
import {FETCH_PROJECTS, fetchProjectsFailedAction, fetchProjectsSuccessAction} from "../actions/Profile.action";
import {TransformService} from "../../utils/transform.service";
import {of} from "rxjs";
import {ProfileService} from "../../service/profile.service";

@Injectable()
export class ProjectEpic {
  constructor(private projectService: ProjectService, private profileService: ProfileService){}

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

  fetchProjects$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_PROJECTS).pipe(
      switchMap(({}) => {
        return this.profileService
          .getProjects()
          .pipe(
            map( projects => fetchProjectsSuccessAction(TransformService.transformToMap(projects))),
            catchError(error => of(fetchProjectsFailedAction(error.message)))
          );
      })
    );
  }
}
