import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import { RegisterEpic } from './register.epic';
import {TicketsEpic} from './tickets.epic';
import {ProjectEpic} from "./project.epic";
import {FilterEpic} from "./filter.epic";
import {ChangeProfileEpic} from "./change-profile.epic";
import {ProfileEpic} from "./profile.epic";
import {CurrentFilterEpic} from "./current-filter.epic";


@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic,
                private ticketsEpic: TicketsEpic,  private projectEpic: ProjectEpic,
                private filterEpic: FilterEpic, private registerEpic: RegisterEpic,
                private changeProfileEpic: ChangeProfileEpic,
                private profileEpic: ProfileEpic,
                private currentEpic: CurrentFilterEpic
    ){}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.updateUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$,
            this.registerEpic.register$,
            // this.ticketsEpic.createTicket$,
            this.ticketsEpic.fetchTicketNames$,
            this.projectEpic.createProject$,
            this.changeProfileEpic.changeProfile$,
            // this.projectEpic.fetchProjects$,

            this.filterEpic.createFilter$,
            this.filterEpic.deleteFilter$,
            // this.filterEpic.fetchFilter$,
            this.filterEpic.selectFilter$
            // this.currentEpic
        );
    }
}
