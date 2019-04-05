import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalUserStorageService } from 'src/app/service/global-storage.service';
import { LOGIN_USER, LOGOUT_USER, updateCurrentUserAction, loginUserFailedAction } from '../actions/current-user.actions';

@Injectable()
export class CurrentUserEpic {
    constructor(private authService: AuthService, private localStorageService: GlobalUserStorageService) { }

    loginUser$ = (action$: ActionsObservable<AnyAction>) => {
        return action$.ofType(LOGIN_USER).pipe(
            switchMap(({ payload }) => {
                return this.authService
                    .login(payload.credential)
                    .pipe(
                        map(user => {
                            this.localStorageService.currentUser = { ...user };
                            return updateCurrentUserAction(user);
                        }),
                        catchError((error) => {
                            return of(loginUserFailedAction());
                        })
                    );
            })
        );
    }

    logout$ = (action$: ActionsObservable<AnyAction>) => {
        return action$.ofType(LOGOUT_USER).pipe(
            switchMap(({ }) => {
                this.localStorageService.currentUser = null;
                return of(updateCurrentUserAction(null));
            })
        );
    }

}
