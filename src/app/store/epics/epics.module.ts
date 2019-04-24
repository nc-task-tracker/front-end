import {NgModule} from '@angular/core';
import {UserEpic} from './user.epic';
import {CurrentUserEpic} from './current-user.epic';
import {ProjectEpic} from "./project.epic";
import {TicketsEpic} from './tickets.epic';



@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    ProjectEpic,
    TicketsEpic
  ],
})
export class EpicsModule {
}
