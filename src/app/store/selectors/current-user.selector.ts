import { AppState } from '..';

export const selectCurrentUser = (state: AppState) => state.currentUser;

export const selectCurrentUserName = (state: AppState) => state.currentUser.login;


