import { Reducer, combineReducers } from 'redux';
import { usersReducer } from './user.reducer';
import { userPageReducer } from './user-page.reducer';
import { routerReducer } from '@angular-redux/router';
import { currentUserReducer } from './current-user.reducer';


export const reducers: Reducer = combineReducers({
    usersState: usersReducer,
    userPageState: userPageReducer,
    currentUser: currentUserReducer,
    route: routerReducer
});
