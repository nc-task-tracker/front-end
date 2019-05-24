import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {catchError, map, switchMap} from "rxjs/operators";
import {TransformService} from "../../utils/transform.service";
import {of} from "rxjs";
import {
  FETCH_PROFILE,
  FETCH_PROJECTS, fetchProfileFailedAction, fetchProfileSuccessAction,
  fetchProjectsFailedAction,
  fetchProjectsSuccessAction
} from "../actions/Profile.action";
import {Injectable} from "@angular/core";
import {ProfileService} from "../../service/profile.service";
import {ProjectService} from "../../service/project.service";

@Injectable()
export class ProfileEpic {
  constructor(private projectService: ProjectService, private profileService: ProfileService) {}

  fetchProfile$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_PROFILE).pipe(
      switchMap(({payload}) => {
        return this.profileService
          .getProfile(payload.profileId)
          .pipe(
            map( profile => fetchProfileSuccessAction(profile)),
            catchError(error => of(fetchProfileFailedAction(error.message)))
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
