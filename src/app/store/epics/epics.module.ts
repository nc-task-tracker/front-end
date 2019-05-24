import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';
import {RegisterEpic} from './register.epic';
import {ProjectEpic} from './project.epic';
import {TicketsEpic} from './tickets.epic';
import {CurrentTicketsEpic} from './current-ticket.epic';
import {FilterEpic} from './filter.epic';
import {ChangeProfileEpic} from "./change-profile.epic";
import {ProfileEpic} from "./profile.epic";
import {CurrentFilterEpic} from "./current-filter.epic";


@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    TicketsEpic,
    ChangeProfileEpic,
    ProjectEpic,
    TicketsEpic,
    RegisterEpic,
    ProfileEpic,
    FilterEpic,
    CurrentFilterEpic,
    CurrentTicketsEpic
  ]
})
export class EpicsModule {
}
