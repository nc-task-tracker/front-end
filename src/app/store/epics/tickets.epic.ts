import {Injectable} from '@angular/core';
import {TicketServiceService} from '../../service/ticket-service.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {CREATE_USER, createUserSuccessAction} from '../actions/users.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {CREATE_TICKET, createTicketAction, createTicketSuccessAction} from '../actions/tickets.actions';

@Injectable()
export class TicketsEpic {

  constructor(private ticketService: TicketServiceService) {}

  // TODO fix red
  createTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType<ReturnType<typeof createTicketAction>>(CREATE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.ticketService
          .createTicket(payload.ticket)
          .pipe(
            map( ticket => createTicketSuccessAction(ticket))
          );
      })
    );
  }

}
