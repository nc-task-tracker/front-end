import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {
  CREATE_TICKET_SUCCESS, DELETE_TICKET, DELETE_TICKET_SUCCESS, FETCH_TICKETS,
  FETCH_TICKETS_SUCCESS, SAVE_COMMENT, SAVE_COMMENT_SUCCESS, UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS
} from '../actions/tickets.actions';

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
    case FETCH_TICKETS: {
      return { ...state, isLoading: true };
    }
    case FETCH_TICKETS_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    case UPDATE_TICKET:
    case DELETE_TICKET:
    case SAVE_COMMENT:{
      return { ...state, isLoading: true };
    }
    case UPDATE_TICKET_SUCCESS: {
      const { ticket } = action.payload;
      const updatedTickets = new Map(state.tickets).set(ticket.id, ticket);
      return { ...state, tickets: updatedTickets, isLoading: false };
    }
    case DELETE_TICKET_SUCCESS: {
      const { ticketId } = action.payload;
      const updatedTickets = new Map(state.tickets);
      updatedTickets.delete(ticketId);
      return { ...state, tickets: updatedTickets, isLoading: false };
    }
    case SAVE_COMMENT_SUCCESS: {
      const {comment}  = action.payload;
      const updatedTickets = new Map(state.tickets);
      const ticket = updatedTickets.get(comment.issueId);
      ticket.comments.push(comment);
      updatedTickets.set(ticket.id, ticket);
      return { ...state, tickets: updatedTickets, isLoading: false };
    }
    case CREATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      const updatedTickets = new Map(state.tickets).set(ticket.id, ticket);
      return { ...state, tickets: updatedTickets};
    }
    default: {
      return state;
    }
  }
};
