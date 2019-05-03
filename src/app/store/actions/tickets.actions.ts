import {Ticket} from '../../models/ticket.model';

export const CREATE_TICKET = '[Tickets] Create ticket';
export const CREATE_TICKET_SUCCESS = '[Tickets] Create ticket success';
export const CREATE_TICKET_FAILURE = '[Tickets] Create ticket failure';
export const UPDATE_TICKET = '[Tickets] Update ticket';
export const UPDATE_TICKET_SUCCESS = '[Tickets] Update ticket success';
export const DELETE_TICKET = '[Tickets] Delete ticket';
export const DELETE_TICKET_SUCCESS = '[Tickets] Delete ticket success';

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

export const updateTicketAction = (ticket: Ticket) => ({
  type: UPDATE_TICKET,
  payload: {ticket}
});

export const updateTicketSuccessAction = (ticket: Ticket) => ({
  type: UPDATE_TICKET_SUCCESS,
  payload: {ticket}
});

export const deleteTicketAction = (ticketId: string) => ({
  type: DELETE_TICKET,
  payload: {ticketId}
});

export const deleteTicketSuccessAction = (ticketId: string) => ({
  type: DELETE_TICKET_SUCCESS,
  payload: {ticketId}
});
