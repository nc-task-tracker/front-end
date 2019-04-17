import { User } from '../../models/user.model';

export const FETCH_USERS = '[Users] Fetch users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch users success';
export const FETCH_USERS_FAILED = '[Users] Fetch users failed';
export const UPDATE_USER = '[Users] Update user';
export const UPDATE_USER_SUCCESS = '[Users] Update user success';
export const DELETE_USER = '[Users] Delete user';
export const DELETE_USER_SUCCESS = '[Users] Delete users success';

export function fetchUsersAction() {
    return {
        type: FETCH_USERS
    };
}

export function fetchUsersSuccessAction(users: Map<string, User>) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: {users}
    };
}

export function fetchUsersFailedAction(errorMessage: string) {
    return {
        type: FETCH_USERS_FAILED,
        payload: {errorMessage}
    };
}

export function updateUserSuccessAction(user: User) {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {user}
    };
}



