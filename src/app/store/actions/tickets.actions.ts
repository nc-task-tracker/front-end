import {Ticket} from '../../models/ticket.model';

export const CREATE_TICKET = '[Tickets] Create ticket';
export const CREATE_TICKET_SUCCESS = '[Tickets] Create ticket success';
export const CREATE_TICKET_FAILURE = '[Tickets] Create ticket failure';

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
