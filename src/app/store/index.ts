import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';
import {Ticket} from '../models/ticket.model';
import {ChangeProfileState} from "./reducers/change-profile.reduser";
import {Token} from "../models/token.model";

export interface AppState {
  readonly usersState?: UsersState;
  readonly userPageState?: UserPageState;
  readonly currentUser?: User;
  readonly tickets: Map<string, Ticket>;
  readonly route?: string;
  readonly currentToken?: Token;
  readonly changeProfileState?: ChangeProfileState;
  //readonly profileState?: ProfileState;
}
