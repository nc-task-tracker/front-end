import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';
import {RegisterEpic} from './register.epic';


@NgModule({
   providers: [
       UserEpic,
       CurrentUserEpic,
       RegisterEpic
   ],
})
export class EpicsModule {}
