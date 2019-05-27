import { Injectable } from '@angular/core';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import { UserService } from '../../service/user.service';
import {LOGOUT_USER, updateCurrentUserAction} from "../actions/current-user.actions";

@Injectable()
export class UserEpic {
  constructor(private userService: UserService) { }

  getAllDashboardById  = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(LOGOUT_USER).pipe(
      switchMap(({ }) => {
        return of(updateCurrentUserAction(null));
      })
    );
  }
}
