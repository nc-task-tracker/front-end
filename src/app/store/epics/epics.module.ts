import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';
import {RegisterEpic} from './register.epic';
import {ProjectEpic} from './project.epic';
import {TicketsEpic} from './tickets.epic';
import {CurrentTicketsEpic} from './current-ticket.epic';

@NgModule({

   providers: [
     UserEpic,
     CurrentUserEpic,
     ProjectEpic,
     TicketsEpic,
     RegisterEpic,
     CurrentTicketsEpic
   ],
})
export class EpicsModule {
}
