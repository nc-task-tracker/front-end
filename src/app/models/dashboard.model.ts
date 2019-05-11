import {Filter} from "./filter.model";

export interface Dashboard {
  readonly id: string;
  readonly name: string;
  readonly filters: Filter;
}

export const defaultDashboard: Dashboard = {
  id: null,
  name: '',
  filters: ''
};
