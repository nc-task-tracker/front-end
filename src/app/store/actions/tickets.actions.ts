import {Ticket} from '../../models/ticket.model';
import {FETCH_USERS_FAILED} from './users.actions';

export const FETCH_TICKETS = '[Tickets] Fetch tickets';
export const FETCH_TICKETS_SUCCESS = '[Tickets] Fetch tickets success';
export const FETCH_TICKETS_FAILED = '[Tickets] Fetch tickets failed';
export const CREATE_TICKET = '[Tickets] Create ticket';
export const CREATE_TICKET_SUCCESS = '[Tickets] Create ticket success';
export const CREATE_TICKET_FAILURE = '[Tickets] Create ticket failure';
export const UPDATE_TICKET = '[Tickets] Update ticket';
export const UPDATE_TICKET_SUCCESS = '[Tickets] Update ticket success';
export const DELETE_TICKET = '[Tickets] Delete ticket';
export const DELETE_TICKET_SUCCESS = '[Tickets] Delete ticket success';
export const SAVE_COMMENT = '[Comments] Save commment';
export const SAVE_COMMENT_SUCCESS = '[Comments] Save commment success';
export const SELECT_TICKET = '[Current ticket state] Select ticket';
export const SELECT_TICKET_SUCCESS = '[Current ticket state] Select ticket success';

export function fetchTicketsAction() {
  return {
    type: FETCH_TICKETS
  };
}

export function fetchTicketsSuccessAction(tickets: Map<string, Ticket>) {
  return {
    type: FETCH_TICKETS_SUCCESS,
    payload: {tickets}
  };
}

export function fetchTicketsFailedAction(errorMessage: string) {
  return {
    type: FETCH_TICKETS_FAILED,
    payload: {errorMessage}
  };
}

export const createTicketAction = (ticket: Ticket) => ({
  type: CREATE_TICKET,
  payload: {ticket}
});

export const createTicketSuccessAction = (ticket: Ticket) => ({
  type: CREATE_TICKET_SUCCESS,
  payload: {ticket}
});

export const createTicketFailureAction = () => ({
  type: CREATE_TICKET_FAILURE
});

export function updateTicketSuccessAction(ticket: Ticket) {
  return {
    type: UPDATE_TICKET_SUCCESS,
    payload: {ticket}
  };
}

export const deleteTicketAction = (ticketId: string) => ({
  type: DELETE_TICKET,
  payload: {ticketId}
});

export const deleteTicketSuccessAction = (ticketId: string) => ({
  type: DELETE_TICKET_SUCCESS,
  payload: {ticketId}
});

export const saveCommentAction = (comment: Comment) => ({
  type: SAVE_COMMENT,
  payload: {comment}
});

export const saveCommentSuccessAction = (comment: Comment) => ({
  type: SAVE_COMMENT_SUCCESS,
  payload: {comment}
});

export function selectTicket(ticketId: string) {
  return {
    type: SELECT_TICKET,
    payload: {ticketId}
  };
}

export function selectTicketSuccess(ticket: Ticket) {
  return {
    type: SELECT_TICKET_SUCCESS,
    payload: {ticket}
  };
}
