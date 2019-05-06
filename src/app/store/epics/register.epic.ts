import { Injectable } from '@angular/core';
import {REGISTER_USER, registerAction, registerSuccessAction} from '../actions/register.action';
import {switchMap, map, catchError} from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import {RegisterService} from '../../service/register.service';

@Injectable()
export class RegisterEpic {
  constructor(private registerService: RegisterService) { }
  register$ = (action$: ActionsObservable<AnyAction>) => {
      // noinspection JSAnnotator
    return action$.ofType(REGISTER_USER).pipe(
          switchMap(({payload}) => {
              return this.registerService
                  .register(payload.user)
                  .pipe(
                      map( user => registerSuccessAction(user))
                  );
          })
      );
  }
}
