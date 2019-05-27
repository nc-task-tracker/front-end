import { Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {
  DELETE_CURRENT_TICKET_COMMENT_SUCCESS,
  SAVE_CURRENT_TICKET_COMMENT_SUCCESS,
  UPDATE_CURRENT_TICKET
} from '../actions/current-ticket.action';
import {SELECT_TICKET_SUCCESS, UPDATE_TICKET_SUCCESS} from '../actions/tickets.actions';

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
    case SAVE_CURRENT_TICKET_COMMENT_SUCCESS: {
      const {comment, ticketId}  = action.payload;
      if (comment !== null && ticketId == state.currentTicket.id) {
        const updatedTicket = {...state.currentTicket};
        updatedTicket.comments.push(comment);
        return { ...state, currentTicket: updatedTicket, isLoading: false };
      }
      return state;
    }
    case DELETE_CURRENT_TICKET_COMMENT_SUCCESS: {
      const { commentId } = action.payload;
      const updatedTicket = {...state.currentTicket};
      const index = this.updatedTicket.comments.findIndex(comment => comment.id === commentId);
      updatedTicket.comments.splice(index,1);
      return { ...state, currentTicket: updatedTicket, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
