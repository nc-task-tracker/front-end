import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {RegisterComponent} from './components/register/register.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {FilterFormComponent} from "./components/form-filter/filter-form.component";
import {NgModule} from '@angular/core';
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';
import {Error500Component} from "./components/error-pages/500/error-500.component";
import {Error404Component} from "./components/error-pages/404/error-404.component";
import {Error401Component} from "./components/error-pages/401/error-401.component";
import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangeProfileComponent} from "./components/change-profile/change-profile.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/register/register.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {CreateTicketModalComponent} from "./components/create-ticket-modal/create-ticket-modal.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {TicketComponent} from "./components/ticket/ticket.component";

import {CommentsComponent} from './components/ticket/comments/comments.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';

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
  {path: 'filter/create', component: FilterFormComponent},
  {path: 'filter/:filterId', component: FilterFormComponent},
  {path: 'create-ticket', component: CreateTicketPageComponent},
  {path: 'ticket/:issueCode', component: TicketComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'comment', component: CommentsComponent},
  {path: '500', component: Error500Component},
  {path: '404', component: Error404Component},
  {path: '401', component: Error401Component}
  {path: 'dashboard/:id', component: DashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
