import {Filter} from '../../models/filter-item.model';
import {Reducer} from 'redux';
import {
  UPDATE_CURRENT_FILTER
} from '../actions/current-filter.actions';
import {SELECT_FILTER_SUCCESS} from '../actions/filter.actions';

export interface CurrentFilterState {
  readonly currentFilter: Filter;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  currentFilter: null,
  isLoading: true
};

export const currentFilterStateReducer: Reducer<CurrentFilterState> = (state: CurrentFilterState = INITIAL_STATE, action)  => {
  switch (action.type) {
    case UPDATE_CURRENT_FILTER:
    case SELECT_FILTER_SUCCESS: {
      const {filter} = action.payload;
      return { ...state, currentFilter: filter, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
