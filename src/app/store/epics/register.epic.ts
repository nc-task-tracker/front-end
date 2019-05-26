import {Injectable} from '@angular/core';
import {REGISTER_USER, registerSuccessAction} from '../actions/register.action';
import {mergeMap, switchMap} from 'rxjs/operators';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {RegisterService} from '../../service/register.service';
import {of} from "rxjs";
import {loginUserAction} from "../actions/current-user.actions";

@Injectable()
export class RegisterEpic {
  constructor(private registerService: RegisterService) {
  }

  register$ = (action$: ActionsObservable<AnyAction>) => {
    // noinspection JSAnnotator
    return action$.ofType(REGISTER_USER).pipe(
      switchMap(({payload}) => {
        return this.registerService
          .register(payload.user)
          .pipe(
            mergeMap(user => of(
              registerSuccessAction(user),
              loginUserAction({login: payload.user.login, password: payload.user.password})
            ))
          );
      })
    );
  }
}
