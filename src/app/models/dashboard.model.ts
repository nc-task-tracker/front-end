import {Widget} from "./widget.model";
import {User} from "./user.model";

export interface Dashboard {
  readonly id: string;
  readonly name: string;
  readonly user: User;
  readonly widgets: Widget[];
}

export const defaultDashboard: Dashboard = {
  id: null,
  name: '',
  user: null,
  widgets: null
};
