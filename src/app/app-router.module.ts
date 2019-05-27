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
import {CreateDashboardComponent} from "./components/create-dashboard/create-dashboard.component";


const routs: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'change-profile', component: ChangeProfileComponent},
    {path: 'dashboard/:id', component: DashboardComponent},
    {path: 'create-project', component: CreateProjectComponent},
    {path: 'create-ticket', component: CreateTicketModalComponent},
    {path: 'create-dashboard', component: CreateDashboardComponent},
    {path: 'ticket', component: TicketComponent},
    {path: 'home', component: WelcomeComponent}
];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
