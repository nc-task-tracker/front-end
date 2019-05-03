import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {
  CREATE_TICKET_SUCCESS, DELETE_TICKET, DELETE_TICKET_SUCCESS, UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS
} from '../actions/tickets.actions';
import {AppState} from '../index';
import {DELETE_USER, UPDATE_USER} from '../actions/users.actions';

const INITIAL_STATE = new Map<string, Ticket>();

export const ticketReducer: Reducer<Map<string, Ticket>> = (state: Map<string, Ticket> = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS:
    case UPDATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      const updatedState = new Map(state).set(ticket.id, ticket);
      return updatedState;
    }
    case UPDATE_TICKET:
    case DELETE_TICKET: {
      return { ...state, isLoading: true };
    }

    case DELETE_TICKET_SUCCESS: {
      const { ticketId } = action.payload;
      const updatedTickets = new Map(state);
      updatedTickets.delete(ticketId);
      return { ...state, tickets: updatedTickets};
    }
    default: {
      return state;
    }
  }
};
