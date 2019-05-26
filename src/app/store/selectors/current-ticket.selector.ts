import {AppState} from '../index';

export const selectCurrentTicket = (state: AppState) => state.currentTicketState.currentTicket;

export const selectCurrentIsLoading = (state: AppState) => state.currentTicketState.isLoading;
