import { User } from 'src/app/models/user.model';

export const SELECT_USER = '[User State] Select user';
export const SELECT_USER_SUCCESS = '[User State] Select user success';

export function selectUser(userId: string) {
    return {
        type: SELECT_USER,
        payload: {userId}
    };
}

export function selectUserSuccess(user: User) {
    return {
        type: SELECT_USER_SUCCESS,
        payload: {user}
    };
}
