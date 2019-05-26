import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import { RegisterEpic } from './register.epic';
import {TicketsEpic} from './tickets.epic';
import {ProjectEpic} from "./project.epic";
import {CurrentTicketsEpic} from './current-ticket.epic';
import {FilterEpic} from "./filter.epic";
import {ChangeProfileEpic} from "./change-profile.epic";
import {ProfileEpic} from "./profile.epic";
import {CurrentFilterEpic} from "./current-filter.epic";


@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic,
                private ticketsEpic: TicketsEpic,  private projectEpic: ProjectEpic,
                private filterEpic: FilterEpic, private registerEpic: RegisterEpic,
                private profileEpic: ProfileEpic,
                private currentEpic: CurrentFilterEpic,
                private currentTicketEpic: CurrentTicketsEpic,
                private changeProfileEpic: ChangeProfileEpic){}

    getEpics() {
        return combineEpics(
            this.userEpic.fetchUsers$,
            this.userEpic.updateUser$,
            this.userEpic.selectUser$,
            this.currentUserEpic.loginUser$,
            this.currentUserEpic.logout$,
            this.registerEpic.register$,
            this.projectEpic.createProject$,
            this.ticketsEpic.createTicket$,
            this.ticketsEpic.fetchTickets$,
            this.ticketsEpic.updateTicket$,
            this.ticketsEpic.deleteTicket$,
            // this.ticketsEpic.saveComment$,
            this.currentTicketEpic.saveComment$,
            this.currentTicketEpic.deleteTicketComment$,
            this.ticketsEpic.selectTicket$,
            this.currentTicketEpic.updateCurrentTicket$,
            this.ticketsEpic.fetchTicketNames$,
            this.changeProfileEpic.changeProfile$,
            this.filterEpic.createFilter$,
            this.filterEpic.deleteFilter$,
            this.filterEpic.selectFilter$
        );
    }
}
