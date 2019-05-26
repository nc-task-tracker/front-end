import {AppState} from '../index';

export const selectCurrentFilter = (state: AppState) => state.currentFilterState.currentFilter;

export const selectCurrentIsLoading = (state: AppState) => state.currentFilterState.isLoading;
