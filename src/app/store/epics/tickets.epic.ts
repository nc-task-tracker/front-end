import {Injectable} from '@angular/core';
import {TicketServiceService} from '../../service/ticket-service.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {
  CREATE_TICKET,
  createTicketAction,
  createTicketSuccessAction,
  FETCH_TICKET_NAMES,
  fetchTicketNamesAction, fetchTicketNamesFailedAction,
  fetchTicketNamesSuccessAction
} from '../actions/tickets.actions';
import {FILTER_SEARCH, filterSearchAction, filterSearchSuccessAction} from '../actions/filter.actions';

import {TransformService} from "../../utils/transform.service";
import {of} from "rxjs";
import {fetchUsersFailedAction, fetchUsersSuccessAction} from "../actions/users.actions";
@Injectable()
export class TicketsEpic {

  constructor(private ticketService: TicketServiceService) {}

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

  // searchTicket$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType<ReturnType<typeof filterSearchAction>>(FILTER_SEARCH).pipe(
  //     mergeMap(({payload}) => {
  //       return this.ticketService
  //         .searchByFilter(payload.filter)
  //         .pipe(
  //           // map( ticket => filterSearchSuccessAction(filter))
  //         );
  //     })
  //   );
  // }

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
}
