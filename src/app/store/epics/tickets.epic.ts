import {Injectable} from '@angular/core';
import {TicketService} from '../../service/ticket.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {CREATE_USER, createUserSuccessAction} from '../actions/users.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {CREATE_TICKET, createTicketAction, createTicketSuccessAction, GET_ASSIGNEE_LIST, getAssigneeList} from '../actions/tickets.actions';

@Injectable()
export class TicketsEpic {

  constructor(private ticketService: TicketService) {
  }

  createTicket$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType<ReturnType<typeof createTicketAction>>(CREATE_TICKET).pipe(
      mergeMap(({payload}) => {
        return this.ticketService
          .createTicket(payload.ticket)
          .pipe(
            map(ticket => createTicketSuccessAction(ticket))
          );
      })
    );
  }

}
