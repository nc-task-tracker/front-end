import {Injectable} from '@angular/core';
import {TicketServiceService} from '../../service/ticket-service.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {
  CREATE_TICKET, createTicketAction, createTicketSuccessAction, DELETE_TICKET, deleteTicketSuccessAction, FETCH_TICKETS,
  fetchTicketsFailedAction,
  fetchTicketsSuccessAction, SAVE_COMMENT, saveCommentSuccessAction, SELECT_TICKET,
  selectTicketSuccess, UPDATE_TICKET, updateTicketSuccessAction
} from '../actions/tickets.actions';
import {TicketService} from '../../service/ticket.service';
import {TransformService} from '../../utils/transform.service';
import {of} from 'rxjs';

@Injectable()
export class TicketsEpic {

  constructor(private service: TicketServiceService,
              private ticketService: TicketService) {}

  fetchTickets$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_TICKETS).pipe(
      switchMap(({}) => {
        return this.ticketService
          .getTickets()
          .pipe(
            map( tickets => fetchTicketsSuccessAction(TransformService.transformToMap(tickets))),
            catchError(error => of(fetchTicketsFailedAction(error.message)))
          );
      })
    );
  };

  createTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.service
          .createTicket(payload.ticket)
          .pipe(
            map( ticket => createTicketSuccessAction(ticket))
          );
      })
    );
  };

  deleteTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.ticketService.deleteTicket(payload.ticketId)
          .pipe(
            map( () => deleteTicketSuccessAction(payload.ticketId))
          );
      })
    );
  };

  updateTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.ticketService
          .updateTicket(payload.ticket)
          .pipe(
            map( ticket => updateTicketSuccessAction(ticket))
          );
      })
    );
  };

  saveComment$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SAVE_COMMENT).pipe(
      mergeMap(({payload}) => {
        return this.ticketService
          .saveComment(payload.comment)
          .pipe(
            map( comment => saveCommentSuccessAction(comment))
          );
      })
    );
  };

  selectTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SELECT_TICKET).pipe(
      switchMap(({payload}) => {
        return this.ticketService
          .getTicket(payload.ticketId)
          .pipe(
            map( ticket => selectTicketSuccess(ticket))
          );
      })
    );
  }
}
