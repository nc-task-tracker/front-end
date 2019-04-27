import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routs: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
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
