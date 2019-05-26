import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {
  CREATE_TICKET,
  createTicketSuccessAction,
  FETCH_TICKET_NAMES,
  fetchTicketNamesFailedAction,
  fetchTicketNamesSuccessAction
} from '../actions/create-ticket.actions';
import {TicketService} from '../../service/ticket.service';
import {TransformService} from '../../utils/transform.service';
import {saveCurrentTicketCommentAction, updateCurrentTicketAction} from '../actions/current-ticket.action';
import {of} from "rxjs";
import {
  DELETE_TICKET, deleteTicketSuccessAction, FETCH_TICKETS, fetchTicketsFailedAction,
  fetchTicketsSuccessAction, SAVE_COMMENT, SELECT_TICKET, selectTicketSuccess, UPDATE_TICKET, updateTicketSuccessAction
} from '../actions/tickets.actions';

@Injectable()
export class TicketsEpic {

  constructor(private ticketService: TicketService) {}

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
        return this.ticketService
          .createTicket(payload.ticket)
          .pipe(
            map( ticket => createTicketSuccessAction(ticket))
          );
      })
    );
  };

  fetchTicketNames$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_TICKET_NAMES).pipe(
      switchMap(({payload}) => {
        return this.ticketService
          .searchByName(payload.name)
          .pipe(
            map( tikets => fetchTicketNamesSuccessAction(TransformService.transformToMap(tikets))),
            catchError(error => of(fetchTicketNamesFailedAction(error.message)))
          );
      })
    );
  }

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
      mergeMap(({payload, id}) => {
        return this.ticketService
          .updateTicket(payload.ticket, id.ticketId)
          .pipe(
            map( ticket =>  {
              of(
                  updateTicketSuccessAction(ticket, id.ticketId),
                  updateCurrentTicketAction(ticket)
                )}
                )
          );
      })
    );
  };

  // saveComment$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(SAVE_COMMENT).pipe(
  //     mergeMap(({payload, id}) => {
  //       return this.ticketService
  //         .saveComment(payload.comment, id.ticketId)
  //         .pipe(
  //           map( comment => saveCurrentTicketCommentAction(comment, id.ticketId))
  //         );
  //     })
  //   );
  // };

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
