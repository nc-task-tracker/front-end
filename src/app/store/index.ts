import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';
import {Ticket} from '../models/ticket.model';
import {Filter} from "../models/filter-item.model";
import {CurrentFilterState} from './reducers/current-filter.reducer';
import {FilterState} from './reducers/filter.reducer';
import {TicketsState} from './reducers/tickets.reducer';
import {CurrentTicketState} from './reducers/current-ticket.reducer';
import {ChangeProfileState} from "./reducers/change-profile.reduser";
import {Token} from '../models/token.model';

export interface AppState {
    readonly usersState?: UsersState;
    readonly userPageState?: UserPageState;
    readonly currentUser?: User;
    readonly tickets?: Map<string, Ticket>;
    readonly route?: string;
    readonly currentFilterState?: CurrentFilterState;
    readonly filterState?: FilterState;
    readonly ticketsState?: TicketsState;
    readonly currentTicketState?: CurrentTicketState;
    readonly currentToken?: Token;
    readonly changeProfileState?: ChangeProfileState;
  //readonly profileState?: ProfileState;
}
