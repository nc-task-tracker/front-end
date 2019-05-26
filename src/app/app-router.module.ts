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
  {path: 'comment', component: CommentsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
