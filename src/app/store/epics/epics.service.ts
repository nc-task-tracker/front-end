import { Injectable } from '@angular/core';
import { UserEpic } from './user.epic';
import { combineEpics } from 'redux-observable';
import { CurrentUserEpic } from './current-user.epic';
import {TicketsEpic} from './tickets.epic';

@Injectable()
export class EpicService {

    constructor(private userEpic: UserEpic, private currentUserEpic: CurrentUserEpic,
                private ticketsEpic: TicketsEpic) {}

  getEpics() {
    return combineEpics(
      this.userEpic.fetchUsers$,
      this.userEpic.createUser$,
      this.userEpic.updateUser$,
      //this.userEpic.deleteUser$,
      this.userEpic.selectUser$,
      this.currentUserEpic.loginUser$,
      this.currentUserEpic.logout$,
      this.ticketsEpic.createTicket$
    );
  }

}
