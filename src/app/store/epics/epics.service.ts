import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import { RegisterEpic } from './register.epic';
import {TicketsEpic} from './tickets.epic';
import {ProjectEpic} from "./project.epic";


@Injectable()
export class EpicService {


    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic,
                private ticketsEpic: TicketsEpic,  private projectEpic: ProjectEpic,
                private registerEpic: RegisterEpic) {}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.updateUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$,
            this.registerEpic.register$
            this.currentUserEpic.logout$,
            this.ticketsEpic.createTicket$,
            this.projectEpic.createProject$
        );
    }


}
