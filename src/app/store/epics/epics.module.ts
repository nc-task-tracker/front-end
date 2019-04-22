import {NgModule} from '@angular/core';
import {UserEpic} from './user.epic';
import {CurrentUserEpic} from './current-user.epic';
import {TicketsEpic} from './tickets.epic';
import {ChangeProfileEpic} from "./change-profile.epic";



@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    TicketsEpic,
    ChangeProfileEpic
  ],
})
export class EpicsModule {
}
