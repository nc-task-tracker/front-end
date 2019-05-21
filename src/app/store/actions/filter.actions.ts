import {Filter} from "../../models/filter-item.model";

export const CREATE_FILTER = '[Filter] Create filter';
export const CREATE_FILTER_SUCCESS = '[Filter] Create filter success';
export const FILTER_SEARCH = '[Filter] Filter search';
export const FILTER_SEARCH_SUCCESS = '[Filter] Filter search success';

export function createFilterAction(filter: Filter) {
  return {
    type: CREATE_FILTER,
    payload: {filter}
  }
}

export function createFilterSuccessAction(filter: Filter) {
  return {
    type: CREATE_FILTER_SUCCESS,
    payload: {filter}
  }
}

export function filterSearchAction(filter: Filter) {
  return {
    type: FILTER_SEARCH,
    payload: {filter}
  }
}

export function filterSearchSuccessAction(filter: Filter) {
  return {
    type: FILTER_SEARCH_SUCCESS,
    payload: {filter}
  }
}
