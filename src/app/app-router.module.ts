import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangeProfileComponent} from "./components/change-profile/change-profile.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";

import { TicketComponent } from './components/ticket/ticket.component';

const routs: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
    {path: 'create-ticket', component: CreateTicketPageComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'change-profile', component: ChangeProfileComponent},
    {path: 'create-project', component: CreateProjectComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'create-ticket', component: CreateTicketPageComponent},
    {path: 'ticket', component: TicketComponent }
];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
