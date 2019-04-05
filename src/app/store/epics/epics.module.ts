import { NgModule } from '@angular/core';
import { UserEpic } from './user.epic';
import { CurrentUserEpic } from './current-user.epic';


@NgModule({
   providers: [
       UserEpic,
       CurrentUserEpic
   ],
})
export class EpicsModule {}
