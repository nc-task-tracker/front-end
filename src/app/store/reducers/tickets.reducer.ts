import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {CREATE_TICKET_SUCCESS, FETCH_TICKET_NAMES, FETCH_TICKET_NAMES_SUCCESS} from '../actions/create-ticket.actions';
import {FILTER_SEARCH_SUCCESS} from "../actions/filter.actions";
import {User} from "../../models/user.model";
import {UsersState} from "./user.reducer";

// const INITIAL_STATE = new Map<string, Ticket>();


export interface TicketsState {
  readonly tickets: Map<string, Ticket>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  tickets: new Map<string, Ticket>(),
  isLoading: false
};

export const ticketReducer: Reducer<TicketsState> = (state: TicketsState = INITIAL_STATE, action): TicketsState => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      const updatedTickets = new Map(state.tickets).set(ticket.id, ticket);
      return { ...state, tickets: updatedTickets};
    }
    case FETCH_TICKET_NAMES: {
      return { ...state, isLoading: true };
    }
    case FETCH_TICKET_NAMES_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    // case FILTER_SEARCH_SUCCESS: {
    //   const {ticket} = action.payload;
    //   const found_tickets = new Map(state).set(ticket.id, ticket);
    //   return found_tickets;
    // case GET_ASSIGNEE_LIST: {
    //   const inputValue = action.payload;
    //   const assigneeList = new Map(state).set(, inputValue);
    //   return assigneeList;
    // }
    default: {
      return state;
    }
  }
};
