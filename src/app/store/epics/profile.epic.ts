import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {catchError, map, switchMap} from "rxjs/operators";
import {TransformService} from "../../utils/transform.service";
import {of} from "rxjs";
import {FETCH_PROJECTS, fetchProjectsFailedAction, fetchProjectsSuccessAction} from "../actions/Profile.action";
import {Injectable} from "@angular/core";
import {ProfileService} from "../../service/profile.service";

@Injectable()
export class ProfileEpic {
  constructor() {}

  // fetchProjects$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(FETCH_PROJECTS).pipe(
  //     switchMap(({}) => {
  //       return this.profileService
  //         .getProjects()
  //         .pipe(
  //           map( projects => fetchProjectsSuccessAction(TransformService.transformToMap(projects))),
  //           catchError(error => of(fetchProjectsFailedAction(error.message)))
  //         );
  //     })
  //   );
  // }
}
