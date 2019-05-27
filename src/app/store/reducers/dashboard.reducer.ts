import {CREATE_DASHBOARD, CREATE_DASHBOARD_SUCCESS} from "../actions/create-dashboard.actions";
import {Dashboard} from "../../models/dashboard.model";
import {Reducer} from "redux";

export const dashboardReducer: Reducer<Dashboard> = (state: Dashboard = null, action) => {
  switch (action.type) {
    case CREATE_DASHBOARD:
    case CREATE_DASHBOARD_SUCCESS:
    default: {
      return state;
    }
  }
};
