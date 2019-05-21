import {Injectable} from "@angular/core";
import {ChangeProfileService} from "../../service/change-profile-service.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {SAVE_PROFILE, saveProfileSuccessAction} from "../actions/change-profile.actions";
import {map, mergeMap} from "rxjs/operators";

@Injectable()
export class ChangeProfileEpic {
  constructor(private changeProfileService: ChangeProfileService) {
  }

  changeProfile$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SAVE_PROFILE).pipe (
      mergeMap (({payload}) => {
        return this.changeProfileService
          .changeProfile(payload.changeProfile)
          .pipe (
            map (changeProfile => saveProfileSuccessAction (changeProfile))
          );
      })
    );
  }
}
