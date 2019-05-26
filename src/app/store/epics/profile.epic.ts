import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {catchError, map, switchMap} from "rxjs/operators";
import {TransformService} from "../../utils/transform.service";
import {of} from "rxjs";
import {
  FETCH_DASHBOARDS, FETCH_PROFILE,  FETCH_PROJECTS,  FETCH_FILTERS,
  fetchProfileFailedAction,  fetchProfileSuccessAction,
  fetchProjectsFailedAction, fetchProjectsSuccessAction,
  fetchDashboardsSuccessAction,  fetchDashboardsFailedAction,
  fetchFiltersSuccessAction, fetchFiltersFailedAction
} from "../actions/Profile.action";
import {Injectable} from "@angular/core";
import {ProfileService} from "../../service/profile.service";

@Injectable()
export class ProfileEpic {
  constructor(private profileService: ProfileService) {}

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
  };

  fetchDashboards$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_DASHBOARDS).pipe(
      switchMap(({}) => {
        return this.profileService
          .getDashboards()
          .pipe(
            map( dashboards => fetchDashboardsSuccessAction(TransformService.transformToMap(dashboards))),
            catchError(error => of(fetchDashboardsFailedAction(error.message)))
          );
      })
    );
  };

  fetchFilters$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_FILTERS).pipe(
      switchMap(({}) => {
        return this.profileService
          .getFilters()
          .pipe(
            map( filters => fetchFiltersSuccessAction(TransformService.transformToMap(filters))),
            catchError(error => of(fetchFiltersFailedAction(error.message)))
          );
      })
    );
  };

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
  };

}
