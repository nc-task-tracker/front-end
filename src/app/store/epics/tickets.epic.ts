import {Injectable} from '@angular/core';
import {TicketServiceService} from '../../service/ticket-service.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {map, mergeMap} from 'rxjs/operators';
import {
  CREATE_TICKET, createTicketAction, createTicketSuccessAction, DELETE_TICKET, deleteTicketAction,
  deleteTicketSuccessAction, UPDATE_TICKET, updateTicketAction, updateTicketSuccessAction
} from '../actions/tickets.actions';
import {TicketService} from '../../service/ticket.service';

@Injectable()
export class TicketsEpic {

  constructor(private service: TicketServiceService,
              private ticketService: TicketService) {}

  // createTicket$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType<createTicketAction>(CREATE_TICKET).pipe(
  //     mergeMap(({payload}) => {
  //       return this.service
  //         .createTicket(payload.ticket)
  //         .pipe(
  //           map( ticket => createTicketSuccessAction(ticket))
  //         );
  //     })
  //   );
  // }

  deleteTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.ticketService.deleteTicket(payload.ticketId)
          .pipe(
            map( () => deleteTicketSuccessAction(payload.ticketId))
          );
      })
    );
  }

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
  }
}
