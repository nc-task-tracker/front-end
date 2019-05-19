import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {RegisterComponent} from './components/register/register.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {AuthGuardService as AuthGuard} from "./service/auth-guard.service";


const routs: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'change-profile', component: ChangeProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'create-ticket', component: CreateTicketPageComponent, canActivate: [AuthGuard]},
  {path: 'ticket', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'home', component: WelcomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
