import {Ticket} from '../../models/ticket.model';
import {User} from "../../models/user.model";
import {FETCH_USERS, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS} from "./users.actions";

export const CREATE_TICKET = '[Tickets] Create ticket';
export const CREATE_TICKET_SUCCESS = '[Tickets] Create ticket success';
export const CREATE_TICKET_FAILURE = '[Tickets] Create ticket failure';
export const FETCH_TICKET_NAMES = '[Tickets] Fetch ticket names';
export const FETCH_TICKET_NAMES_SUCCESS = '[Tickets] Fetch ticket names success';
export const FETCH_TICKET_NAMES_FAILED = '[Tickets] Fetch ticket names failed';
export const GET_ASSIGNEE_LIST = '[Ticket] Get assignee list';

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

export function fetchTicketNamesAction() {
  return {
    type: FETCH_TICKET_NAMES
  };
}

export function fetchTicketNamesSuccessAction(tickets: Map<string, Ticket>) {
  return {
    type: FETCH_TICKET_NAMES_SUCCESS,
    payload: {tickets}
  };
}

export function fetchTicketNamesFailedAction(errorMessage: string) {
  return {
    type: FETCH_TICKET_NAMES_FAILED,
    payload: {errorMessage}
  };
}

export const getAssigneeList = (inputValue: string) => ({
  type: GET_ASSIGNEE_LIST,
  payload: {inputValue}
});

