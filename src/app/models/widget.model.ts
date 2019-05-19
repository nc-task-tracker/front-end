import {Filter} from "./filter.model";

export interface Widget {
  readonly id: string;
  readonly widgetName: string;
  readonly widgetOrder: number;
  readonly type: string;
  readonly filter: Filter;
  readonly assign: string;
  readonly Priority: string;
  readonly dashboardId: string;
}

export const defaultWidget: Widget = {
  id: null,
  widgetName: '',
  widgetOrder: null,
  type: '',
  filter: null,
  assign: '',
  Priority: '',
  dashboardId: ''
};
