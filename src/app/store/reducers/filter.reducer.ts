import {Filter} from "../../models/filter-item.model";
import {Reducer} from "redux";
import {
  CREATE_FILTER_SUCCESS,
  DELETE_FILTER,
  DELETE_FILTER_SUCCESS,
  FETCH_FILTER,
  FETCH_FILTER_SUCCESS
} from "../actions/filter.actions";

// const INITIAL_STATE = new Map<string, Filter>();
export interface FilterState {
  readonly filter: Map<string, Filter>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  filter: new Map<string, Filter>(),
  isLoading: false
};

export const filterReducer: Reducer<FilterState> = (state: FilterState = INITIAL_STATE, action): FilterState => {
  switch (action.type) {
    case CREATE_FILTER_SUCCESS: {
      const {filter} = action.paylod;
      const updateState = new Map(state.filter).set(filter.id, filter);
      return {...state, filter: updateState};
    }
    case FETCH_FILTER: {
      return { ...state, isLoading: true };
    }
    case FETCH_FILTER_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    case DELETE_FILTER:
    case DELETE_FILTER_SUCCESS: {
      const { filterId } = action.payload;
      const updatedFilter = new Map(state.filter);
      updatedFilter.delete(filterId);
      return { ...state, filter: updatedFilter, isLoading: false };
    }

    default: {
      return state;
    }
  }
};
