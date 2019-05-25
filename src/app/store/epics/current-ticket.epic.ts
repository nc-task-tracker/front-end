import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {OPEN_SUBTASK, UPDATE_CURRENT_TICKET, updateCurrentTicketAction} from '../actions/current-ticket.action';
import {of} from 'rxjs';

@Injectable()
export class CurrentTicketsEpic {

  constructor() {}

  updateCurrentTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(OPEN_SUBTASK).pipe(
      switchMap(({payload}) => {
        return of(updateCurrentTicketAction(payload.ticket));
      })
    );
  }
}

