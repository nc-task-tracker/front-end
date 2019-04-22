import { Reducer, combineReducers } from 'redux';
import { usersReducer } from './user.reducer';
import { userPageReducer } from './user-page.reducer';
import { routerReducer } from '@angular-redux/router';
import { currentUserReducer } from './current-user.reducer';
import {ticketReducer} from './tickets.reducer';
import {changeProfileReducer} from './change-profile.reduser';

export const reducers: Reducer = combineReducers({
    usersState: usersReducer,
    userPageState: userPageReducer,
    currentUser: currentUserReducer,
    tickets: ticketReducer,
    route: routerReducer,
    changeProfile: changeProfileReducer

});
