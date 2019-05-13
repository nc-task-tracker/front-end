import {Ticket} from '../../models/ticket.model';
import {Reducer} from 'redux';
import {CREATE_TICKET_SUCCESS} from '../actions/create-ticket.actions';

const INITIAL_STATE = new Map<string, Ticket>();

export const ticketReducer: Reducer<Map<string, Ticket>> = (state: Map<string, Ticket> = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS: {
      const {ticket} = action.payload;
      return new Map(state).set(ticket.id, ticket);
    }
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
