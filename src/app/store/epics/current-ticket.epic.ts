import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {SELECT_TICKET} from '../actions/tickets.actions';
import {TicketService} from '../../service/ticket.service';
import { UPDATE_CURRENT_TICKET } from '../actions/current-ticket.action';

@Injectable()
export class CurrentTicketsEpic {

  constructor(private ticketService: TicketService) {}

  // updateCurrentTicket$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(UPDATE_CURRENT_TICKET).pipe(
  //     mergeMap(({payload}) => {
  //       return this.ticketService
  //         .updateTicket(payload.ticket)
  //         .pipe(
  //           map( ticket => updateCurrentTicketSuccessAction(ticket))
  //         );
  //     })
  //   );
  // }

  // saveComment$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(SAVE_COMMENT).pipe(
  //     mergeMap(({payload}) => {
  //       return this.ticketService
  //         .saveComment(payload.comment)
  //         .pipe(
  //           map( comment => saveCommentSuccessAction(comment))
  //         );
  //     })
  //   );
  // }
}
