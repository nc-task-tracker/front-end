import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {RegisterComponent} from './components/register/register.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';
import {Error500Component} from "./components/error-pages/500/error-500.component";
import {Error404Component} from "./components/error-pages/404/error-404.component";
import {Error401Component} from "./components/error-pages/401/error-401.component";


const routs: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'change-profile', component: ChangeProfileComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-ticket', component: CreateTicketModalComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'home', component: WelcomeComponent},
  {path: '500', component: Error500Component},
  {path: '404', component: Error404Component},
  {path: '401', component: Error401Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
