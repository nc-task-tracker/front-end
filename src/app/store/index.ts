import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';
import {Ticket} from '../models/ticket.model';
import {Filter} from "../models/filter-item.model";
import {CurrentFilterState} from './reducers/current-filter.reducer';
import {FilterState} from './reducers/filter.reducer';
import {ChangeProfileState} from "./reducers/change-profile.reduser";

export interface AppState {
    readonly usersState?: UsersState;
    readonly userPageState?: UserPageState;
    readonly currentUser?: User;
    readonly tickets: Map<string, Ticket>;
    readonly route?: string;
    readonly currentFilterState?: CurrentFilterState;
    readonly filterState?: FilterState;
  readonly changeProfileState?: ChangeProfileState;
    // readonly filter?: FilterState;

}
