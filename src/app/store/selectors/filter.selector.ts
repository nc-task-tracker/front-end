import { AppState } from '..';
import {defaultFilter} from '../../models/filter-item.model';

export const selectFilter = (state: AppState) => Array.from(state.filterState.filter.values());

export const isLoading = (state: AppState) => state.filterState.isLoading;

export const selectFilterById = (state: AppState, filterId: string) => {
  const filter = state.filterState.filter.get(filterId);
  return filter ? filter : defaultFilter;
  // return filter;
};
