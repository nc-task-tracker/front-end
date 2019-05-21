import {Filter} from "../../models/filter-item.model";
import {Reducer} from "redux";
import {CREATE_FILTER_SUCCESS} from "../actions/filter.actions";

const INITIAL_STATE = new Map<string, Filter>();

export const filterReducer: Reducer<Map<string, Filter>> = (state: Map<string, Filter> = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_FILTER_SUCCESS: {
      const {filter} = action.paylod;
      const updateState = new Map(state).set(filter.id, filter);
      return updateState;
    }
    default: {
      return state;
    }
  }
};
