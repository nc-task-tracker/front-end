import { Reducer } from 'redux';
import { User } from '../../models/user.model';
import { CREATE_USER, CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_SUCCESS,
    FETCH_USERS, FETCH_USERS_SUCCESS, UPDATE_USER, UPDATE_USER_SUCCESS } from '../actions/users.actions';

export interface UsersState {
    readonly users: Map<string, User>;
    readonly isLoading: boolean;
}

const INITIAL_STATE = {
    users: new Map<string, User>(),
    isLoading: false
};

export const usersReducer: Reducer<UsersState> = (state: UsersState = INITIAL_STATE, action): UsersState => {
    switch (action.type) {
        case FETCH_USERS: {
            return { ...state, isLoading: true };
        }
        case FETCH_USERS_SUCCESS: {
            return { ...state, ...action.payload, isLoading: false };
        }
        case CREATE_USER:
        case UPDATE_USER:
        case DELETE_USER: {
            return { ...state, isLoading: true };
        }
        case CREATE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS: {
            const { user } = action.payload;
            const updatedUsers = new Map(state.users).set(user.id, user);
            return { ...state, users: updatedUsers, isLoading: false };
        }
        case DELETE_USER_SUCCESS: {
            const { userId } = action.payload;
            const updatedUsers = new Map(state.users);
            updatedUsers.delete(userId);
            return { ...state, users: updatedUsers, isLoading: false };
        }
        default: {
            return state;
        }
    }
};

