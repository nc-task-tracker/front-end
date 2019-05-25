import {AppState} from '../index';

export const selectCurrentTicket = (state: AppState) => state.currentTicketState.currentTicket;

export const selectCurrentIsLoading = (state: AppState) => state.currentTicketState.isLoading;

export const selectCurrentTicketComments = (state: AppState) => state.currentTicketState.currentTicket.comments;

export const selectCurrentTicketName = (state: AppState) => state.currentTicketState.currentTicket.issueName;
