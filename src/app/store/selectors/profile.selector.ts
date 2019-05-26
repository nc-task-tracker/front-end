import { AppState } from '..';

export const selectProfile = (state: AppState) => state.profile.profile;
export const selectProfileIsLoading = (state: AppState) => state.profile.isLoading;
