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
import {CreateFilterComponent} from "./components/create-filter/create-filter.component";
import {NgModule} from '@angular/core';
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';


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
  {path: 'create-filter', component: CreateFilterComponent},
];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
