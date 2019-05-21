import { Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {
  SAVE_CURRENT_TICKET_COMMENT,
  UPDATE_CURRENT_TICKET
} from '../actions/current-ticket.action';
import {SELECT_TICKET_SUCCESS} from '../actions/tickets.actions';

export interface CurrentTicketState {
  readonly currentTicket: Ticket;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  currentTicket: null,
  isLoading: true
};

export const currentTicketStateReducer: Reducer<CurrentTicketState> = (state: CurrentTicketState = INITIAL_STATE, action)  => {
  switch (action.type) {
    case UPDATE_CURRENT_TICKET:
    case SELECT_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      return { ...state, currentTicket: ticket, isLoading: false};
    }
    case SAVE_CURRENT_TICKET_COMMENT: {
      const {comment,ticketId}  = action.payload;

      if (comment !== null && ticketId == state.currentTicket.id) {
        const updatedTicket = {...state.currentTicket};
        updatedTicket.comments.push(comment);
        return { ...state, tickets: updatedTicket, isLoading: false };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};
