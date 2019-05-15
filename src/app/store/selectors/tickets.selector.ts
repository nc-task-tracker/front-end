import { AppState } from '..';
import {defaultTicket} from '../../models/ticket.model';

export const selectTickets = (state: AppState) => Array.from(state.ticketsState.tickets.values());

export const isLoading = (state: AppState) => state.ticketsState.isLoading;

export const selectTicketById = (state: AppState, ticketId: string) => {
  const ticket = state.ticketsState.tickets.get(ticketId);
  return ticket ? ticket : defaultTicket;
};

