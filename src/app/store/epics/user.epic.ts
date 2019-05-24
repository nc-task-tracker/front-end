import { Injectable } from '@angular/core';
import { FETCH_USERS, fetchUsersSuccessAction, fetchUsersFailedAction,
  updateUserSuccessAction, UPDATE_USER} from '../actions/users.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import { TransformService } from '../../utils/transform.service';
import { UserService } from '../../service/user.service';
import { SELECT_USER, selectUser, selectUserSuccess } from '../actions/user-state.actions';

@Injectable()
export class UserEpic {
    constructor(private userService: UserService) { }

    fetchUsers$ = (action$: ActionsObservable<AnyAction>) => {
        return action$.ofType(FETCH_USERS).pipe(
            switchMap(({}) => {
                return this.userService
                    .getUsers()
                    .pipe(
                        map( users => fetchUsersSuccessAction(TransformService.transformToMap(users))),
                        catchError(error => of(fetchUsersFailedAction(error.message)))
                    );
            })
        );
    }

    updateUser$ = (action$: ActionsObservable<AnyAction>) => {
        return action$.ofType(UPDATE_USER).pipe(
            switchMap(({payload}) => {
                return this.userService
                    .updateUser(payload.user)
                    .pipe(
                        map( user => updateUserSuccessAction(user))
                    );
            })
        );
    }

    selectUser$ = (action$: ActionsObservable<AnyAction>) => {
        return action$.ofType(SELECT_USER).pipe(
            switchMap(({payload}) => {
                return this.userService
                    .getUser(payload.userId)
                    .pipe(
                        map( user => selectUserSuccess(user)),
                        catchError(error => of(fetchUsersFailedAction(error.message)))
                        );
            })
        );
    }

}
