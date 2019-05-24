import {AppState} from '../index';

export const selectTickets = (state: AppState) => state.filterTicketsState.tickets;

export const selectIsLoading = (state: AppState) => state.filterTicketsState.isLoading;
