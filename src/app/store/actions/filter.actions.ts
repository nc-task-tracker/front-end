import {Filter} from "../../models/filter-item.model";
import {Ticket} from "../../models/ticket.model";
import {CREATE_TICKET, CREATE_TICKET_SUCCESS} from "./tickets.actions";

export const CREATE_FILTER = '[Filter] Create filter';
export const CREATE_FILTER_SUCCESS = '[Filter] Create filter success';
export const FILTER_SEARCH = '[Filter] Filter search';
export const FILTER_SEARCH_SUCCESS = '[Filter] Filter search success';
export const DELETE_FILTER = '[Filter] Delete filter';
export const DELETE_FILTER_SUCCESS = '[Filter] Delete filter success';
export const SELECT_FILTER = '[Current filter state] Select filter';
export const SELECT_FILTER_SUCCESS = '[Current filter state] Select filter success';
export const FETCH_FILTER = '[Filter] Fetch filter';
export const FETCH_FILTER_SUCCESS = '[Filter] Fetch filter success';
export const FETCH_FILTER_FAILED = '[Filter] Fetch filter failed';

export const createFilterAction = (filter: Filter) => ({
  type: CREATE_FILTER,
  payload: {filter}
});

export const createFilterSuccessAction = (filter: Filter) => ({
  type: CREATE_FILTER_SUCCESS,
  payload: {filter}
});

export function filterSearchAction(filter: Filter) {
  return {
    type: FILTER_SEARCH,
    payload: {filter}
  }
}

export function filterSearchSuccessAction(tickets: Ticket[]) {
  return {
    type: FILTER_SEARCH_SUCCESS,
    payload: {tickets}
  }
}

export const deleteFilterAction = (filterId: string) => ({
  type: DELETE_FILTER,
  payload: {filterId}
});

export const deleteFilterSuccessAction = (filterId: string) => ({
  type: DELETE_FILTER_SUCCESS,
  payload: {filterId}
});

export function selectFilter(filterId: string) {
  return {
    type: SELECT_FILTER,
    payload: {filterId}
  };
}

export function selectFilterSuccess(filter: Filter) {
  return {
    type: SELECT_FILTER_SUCCESS,
    payload: {filter}
  };
}

export function fetchFilterAction() {
  return {
    type: FETCH_FILTER
  };
}

export function fetchFilterSuccessAction(filter: Map<string, Filter>) {
  return {
    type: FETCH_FILTER_SUCCESS,
    payload: {filter}
  };
}

export function fetchFilterFailedAction(errorMessage: string) {
  return {
    type: FETCH_FILTER_FAILED,
    payload: {errorMessage}
  };
}
