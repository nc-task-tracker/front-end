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
import {ProjectPageComponent} from "./components/project-page/project-page.component";
import {ProjectsPageComponent} from "./components/projects-page/projects-page.component";
import {AuthGuardService as AuthGuard} from "./service/auth-guard.service";


const routs: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'change-profile', component: ChangeProfileComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'project/:id', component: ProjectPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-ticket', component: CreateTicketPageComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'home', component: WelcomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
