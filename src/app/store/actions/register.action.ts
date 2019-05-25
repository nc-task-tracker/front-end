// import {REGISTER_USER, REGISTER_USER_SUCCESS} from './register.action';
// import {T} from '../../models/user.model';
import { User } from '../../models/user.model';

export const REGISTER_USER = '[Users] Register user';
export const REGISTER_USER_SUCCESS = '[Users] Register user success';

export function registerAction(user: User) {
  return {
    type: REGISTER_USER,
    payload: {user}
  };
}

export function registerSuccessAction(user: User) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {user}
  };
}
