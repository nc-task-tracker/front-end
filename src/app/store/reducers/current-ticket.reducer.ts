import {defaultTicket, Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import { UPDATE_CURRENT_TICKET,
  UPDATE_CURRENT_TICKET_SUCCESS
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
    case UPDATE_CURRENT_TICKET: {
      return { ...state, currentTicket: action.payload.ticket, isLoading: true };
    }

    case UPDATE_CURRENT_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      return { ...state, currentTicket: ticket, isLoading: false};
    }
    case SELECT_TICKET_SUCCESS: {
      return {...state, currentTicket: action.payload.user, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
