import {NgModule} from '@angular/core';
import {UserEpic} from './user.epic';
import {CurrentUserEpic} from './current-user.epic';
import {ProjectEpic} from "./project.epic";


@NgModule({
  providers: [
    UserEpic,
    CurrentUserEpic,
    ProjectEpic
  ],
})
export class EpicsModule {
}
