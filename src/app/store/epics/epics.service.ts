import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import { RegisterEpic } from './register.epic';

@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic, private registerEpic: RegisterEpic) {}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.updateUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$,
            this.registerEpic.register$
        );
    }

}
