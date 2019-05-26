import { Reducer, combineReducers } from 'redux';
import { usersReducer } from './user.reducer';
import { userPageReducer } from './user-page.reducer';
import { routerReducer } from '@angular-redux/router';
import { currentUserReducer } from './current-user.reducer';
import {projectReducer} from "./project.reducer";
import {ticketReducer} from './tickets.reducer';
import {registerReducer} from './register.reducer';
import {filterReducer} from "./filter.reducer";
import {currentTicketStateReducer} from './current-ticket.reducer';
import {changeProfileReducer} from './change-profile.reduser';
import {currentFilterStateReducer} from './current-filter.reducer';
import {profileReducer} from "./profile.reducer";


export const reducers: Reducer = combineReducers({
    usersState: usersReducer,
    userPageState: userPageReducer,
    currentUser: currentUserReducer,
    currentTicketState: currentTicketStateReducer,
    route: routerReducer,
    register: registerReducer,
    tickets: ticketReducer,
    createProject: projectReducer,
    filter: filterReducer,
    project: projectReducer,
    changeProfile: changeProfileReducer,
    currentFilterState: currentFilterStateReducer,
    profile: profileReducer,
    projects: profileReducer,
    filters: profileReducer,
    dashboards: profileReducer
});
