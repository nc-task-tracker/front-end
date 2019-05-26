import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {
  SAVE_COMMENT_SUCCESS, SELECT_TICKET, UPDATE_TICKET, UPDATE_TICKET_SUCCESS,
  updateTicketSuccessAction
} from '../actions/tickets.actions';
import {TicketService} from '../../service/ticket.service';
import {UPDATE_CURRENT_TICKET, updateCurrentTicketAction} from '../actions/current-ticket.action';
import {of} from 'rxjs';
import {updateCurrentUserAction} from '../actions/current-user.actions';

@Injectable()
export class CurrentTicketsEpic {

  constructor() {}

  // updateCurrentTicket$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(UPDATE_TICKET_SUCCESS).pipe(
  //     switchMap(({payload}) => {
  //       return of(updateCurrentTicketAction(payload.ticket));
  //     })
  //   );
  // }
}

