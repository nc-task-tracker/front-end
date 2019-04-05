import { UsersState } from './reducers/user.reducer';
import { UserPageState } from './reducers/user-page.reducer';
import { User } from '../models/user.model';

export interface AppState {
    readonly usersState?: UsersState;
    readonly userPageState?: UserPageState;
    readonly currentUser?: User;
    readonly route?: string;
}
