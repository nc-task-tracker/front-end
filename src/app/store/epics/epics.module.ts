import {NgModule} from '@angular/core';
import {UserEpic} from './user.epic';
import {CurrentUserEpic} from './current-user.epic';
import {TicketsEpic} from './tickets.epic';


@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    TicketsEpic
  ],
})
export class EpicsModule {
}
