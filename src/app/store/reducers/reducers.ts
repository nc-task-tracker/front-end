import { Reducer, combineReducers } from 'redux';
import { usersReducer } from './user.reducer';
import { userPageReducer } from './user-page.reducer';
import { routerReducer } from '@angular-redux/router';
import { currentUserReducer } from './current-user.reducer';
import {projectReducer} from "./project.reducer";
import {ticketReducer} from './tickets.reducer';
import {registerReducer} from './register.reducer';
import {currentTicketStateReducer} from './current-ticket.reducer';
import {changeProfileReducer} from './change-profile.reduser';

export const reducers: Reducer = combineReducers({
    usersState: usersReducer,
    userPageState: userPageReducer,
    currentUser: currentUserReducer,
    // currentTicket: currentTicketReducer,
    currentTicketState: currentTicketStateReducer,
    route: routerReducer,
    register: registerReducer,
    tickets: ticketReducer,
    project: projectReducer,
    changeProfile: changeProfileReducer,
    createProject: projectReducer
});
