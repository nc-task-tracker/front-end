import {
  REGISTER_USER, REGISTER_USER_SUCCESS
} from '../actions/register.action';
import {Reducer} from 'redux';
import {UsersState} from './user.reducer';
import {User} from '../../models/user.model';

const INITIAL_STATE = {
  users: new Map<string, User>(),
  isLoading: false
};

export const registerReducer: Reducer<UsersState> = (state: UsersState = INITIAL_STATE, action): UsersState => {
  switch (action.type) {
    case REGISTER_USER: {
      return { ...state, isLoading: true };
    }
    case REGISTER_USER_SUCCESS: {
      const { user } = action.payload;
      const updatedUsers = new Map(state.users).set(user.id, user);
      return { ...state, users: updatedUsers, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
