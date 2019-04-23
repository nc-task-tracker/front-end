import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import {TicketsEpic} from './tickets.epic';
import {ChangeProfileEpic} from "./change-profile.epic";


@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic,
                private currentUserEpic: CurrentUserEpic,
                private ticketsEpic: TicketsEpic,
                private changeProfileEpic: ChangeProfileEpic){}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.createUser$,
            this.userEpic.updateUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$,
            this.ticketsEpic.createTicket$,
            this.changeProfileEpic.changeProfile$

        );
    }

}
