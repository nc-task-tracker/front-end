import {AppState} from '../index';
import { defaultUser } from 'src/app/models/user.model';

export const selectUsers = (state: AppState) => Array.from(state.usersState.users.values());

export const isLoading = (state: AppState) => state.usersState.isLoading;

export const selectUserById = (state: AppState, userId: string) => {
   const user = state.usersState.users.get(userId);
   return user ? user : defaultUser;
};

export const selectUserFromState = (state: AppState) => {
   return state.userPageState.userModel;
};



