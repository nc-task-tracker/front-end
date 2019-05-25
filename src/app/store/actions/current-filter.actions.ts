import {Filter} from '../../models/filter-item.model';

export const UPDATE_CURRENT_FILTER = '[Filter] Update current filter';

export function updateCurrentFilterAction(filter: Filter) {
  return {
    type: UPDATE_CURRENT_FILTER ,
    payload: { filter },
  };
}
