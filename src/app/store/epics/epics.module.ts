import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';
import {RegisterEpic} from './register.epic';
import {ProjectEpic} from './project.epic';
import {TicketsEpic} from './tickets.epic';
import {DashboardEpic} from "./dashboard.epic";

@NgModule({

   providers: [
     UserEpic,
     CurrentUserEpic,
     ProjectEpic,
     TicketsEpic,
     RegisterEpic,
     DashboardEpic
   ],
})
export class EpicsModule {
}
