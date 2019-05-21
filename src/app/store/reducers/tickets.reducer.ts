import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {CREATE_TICKET_SUCCESS, FETCH_TICKET_NAMES, FETCH_TICKET_NAMES_SUCCESS} from '../actions/tickets.actions';
import {FILTER_SEARCH_SUCCESS} from "../actions/filter.actions";

const INITIAL_STATE = new Map<string, Ticket>();

export const ticketReducer: Reducer<Map<string, Ticket>> = (state: Map<string, Ticket> = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      const updatedState = new Map(state).set(ticket.id, ticket);
      return updatedState;
    }
    case FETCH_TICKET_NAMES: {
      return { ...state};
    }
    case FETCH_TICKET_NAMES_SUCCESS: {
      return { ...state, ...action.payload};
    }
    // case FILTER_SEARCH_SUCCESS: {
    //   const {ticket} = action.payload;
    //   const found_tickets = new Map(state).set(ticket.id, ticket);
    //   return found_tickets;
    // }
    default: {
      return state;
    }
  }
};
