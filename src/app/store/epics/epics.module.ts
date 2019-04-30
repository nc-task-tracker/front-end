import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';
import {RegisterEpic} from './register.epic';
import {ProjectEpic} from './project.epic';
import {TicketsEpic} from './tickets.epic';
import {ChangeProfileEpic} from "./change-profile.epic";


@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    TicketsEpic,
    ChangeProfileEpic,
    ProjectEpic,
    TicketsEpic,
    RegisterEpic
  ],

})
export class EpicsModule {
}
