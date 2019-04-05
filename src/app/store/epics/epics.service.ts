import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';

@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic) {}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.createUser$,
            this.userEpic.updateUser$,
            this.userEpic.deleteUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$
        );
    }

}
