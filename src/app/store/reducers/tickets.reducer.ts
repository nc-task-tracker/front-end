import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {CREATE_TICKET_SUCCESS} from '../actions/tickets.actions';

const INITIAL_STATE = new Map<string, Ticket>();

export const ticketReducer: Reducer<Map<string, Ticket>> = (state: Map<string, Ticket> = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      const updatedState = new Map(state).set(ticket.id, ticket);
      return updatedState;
    }
    default: {
      return state;
    }
  }
};
