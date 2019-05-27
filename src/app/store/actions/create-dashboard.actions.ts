import {Dashboard} from "../../models/dashboard.model";

export const CREATE_DASHBOARD = '[Dashboard] Create dashboard';
export const CREATE_DASHBOARD_SUCCESS = '[Dashboard] Create dashboard success';

export function createDashboardAction(dashboard: Dashboard) {
  return {
    type: CREATE_DASHBOARD,
    payload: {dashboard}
  };
}

export function createDashboardSuccessAction(dashboard: Dashboard) {
  return {
    type: CREATE_DASHBOARD_SUCCESS,
    payload: {dashboard}
  };
}
