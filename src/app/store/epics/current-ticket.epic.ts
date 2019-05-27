import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {
  DELETE_CURRENT_TICKET_COMMENT, deleteCurrentTicketCommentSuccess,
  OPEN_SUBTASK, SAVE_CURRENT_TICKET_COMMENT, saveCurrentTicketCommentSuccessAction,
  updateCurrentTicketAction
} from '../actions/current-ticket.action';
import {of} from 'rxjs';
import {TicketService} from '../../service/ticket.service';
import {DELETE_TICKET} from '../actions/tickets.actions';

@Injectable()
export class CurrentTicketsEpic {

  constructor(private ticketService: TicketService) {}

  updateCurrentTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(OPEN_SUBTASK).pipe(
      switchMap(({payload}) => {
        return of(updateCurrentTicketAction(payload.ticket));
      })
    );
  };

  saveComment$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SAVE_CURRENT_TICKET_COMMENT).pipe(
      mergeMap(({payload, ticketId}) => {
        return this.ticketService
          .saveComment(payload.comment, payload.ticketId)
          .pipe(
            map( comment => saveCurrentTicketCommentSuccessAction(comment, payload.ticketId))
          );
      })
    );
  };

  deleteTicketComment$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_CURRENT_TICKET_COMMENT).pipe(
      mergeMap(({payload}) => {
        return this.ticketService.deleteTicketComment(payload.commentId)
          .pipe(
            map( () => deleteCurrentTicketCommentSuccess(payload.commentId))
          );
      })
    );
  };
}

