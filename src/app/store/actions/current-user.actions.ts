import { User } from 'src/app/models/user.model';
import { Credential } from 'src/app/models/credentials.model';

export const UPDATE_CURRENT_USER = '[Current T] Update current user';
export const LOGIN_USER = '[Current T] Login user';
export const LOGOUT_USER = '[Current T] Logout';
export const LOGIN_USER_FAILED = '[Current T] Login user failed';

export function updateCurrentUserAction(user: User) {
    return {
        type: UPDATE_CURRENT_USER,
        payload: { user }
    };
}

export function loginUserAction(credential: Credential) {
    return {
        type: LOGIN_USER,
        payload: { credential }
    };
}

export function logoutUserAction() {
    return {
        type: LOGOUT_USER
    };
}

export function loginUserFailedAction() {
    return {
        type: LOGIN_USER_FAILED
    };
}
