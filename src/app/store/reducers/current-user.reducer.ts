import { User } from 'src/app/models/user.model';
import { Reducer } from 'redux';
import { UPDATE_CURRENT_USER } from '../actions/current-user.actions';

export const currentUserReducer: Reducer<User> = (state: User = null, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER: {
            return action.payload.user;
        }
        default: {
            return state;
        }
    }
};
