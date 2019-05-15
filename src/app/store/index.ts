import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';
import { Ticket } from '../models/ticket.model';
import {TicketsState} from './reducers/tickets.reducer';
import {CurrentTicketState} from './reducers/current-ticket.reducer';

export interface AppState {
    readonly usersState?: UsersState;
    readonly userPageState?: UserPageState;
    readonly currentUser?: User;
    readonly ticketsState?: TicketsState;
    readonly currentTicketState?: CurrentTicketState;
    readonly route?: string;
}
