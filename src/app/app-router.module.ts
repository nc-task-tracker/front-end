import { Routes, RouterModule} from '@angular/router';
// import { EditUserComponent } from './components/edit-user/edit-user.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {RegisterComponent} from './components/register/register.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {FilterFormComponent} from "./components/form-filter/filter-form.component";
import {NgModule} from '@angular/core';
import {ProjectPageComponent} from "./components/project-page/project-page.component";
import {ProjectsPageComponent} from "./components/projects-page/projects-page.component";
import {AuthGuardService as AuthGuard} from "./service/auth-guard.service";
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';
import {ProjectMemberComponent} from "./components/project-member/project-member.component";


const routs: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'change-profile', component: ChangeProfileComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'project/:id', component: ProjectPageComponent},
  {path: 'project/:id/assignee', component: ProjectMemberComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-ticket', component: CreateTicketModalComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'filter/create', component: FilterFormComponent},
  {path: 'filter/:filterId', component: FilterFormComponent}
];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
