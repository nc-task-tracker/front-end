import {Widget} from "./widget.model";

export interface Dashboard {
  readonly id: string;
  readonly name: string;
  readonly widgets: Widget[];
}

export const defaultDashboard: Dashboard = {
  id: null,
  name: '',
  widgets: null
};
