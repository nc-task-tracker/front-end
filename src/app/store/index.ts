import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';
import {Ticket} from '../models/ticket.model';
import {Filter} from "../models/filter-item.model";
// import {FilterState} from './reducers/filter.reducer';

export interface AppState {
    readonly usersState?: UsersState;
    readonly userPageState?: UserPageState;
    readonly currentUser?: User;
    readonly tickets: Map<string, Ticket>;
    readonly route?: string;
    // readonly filter?: FilterState;

}
