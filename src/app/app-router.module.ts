import {UserListComponent} from './components/user-list/user-list.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {CreateProjectComponent} from "./components/create-project/create-project.component";

const routs: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'register', component: EditUserComponent},
  {path: 'create-ticket', component: CreateTicketPageComponent},
  {path: 'create-project', component: CreateProjectComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ]
})
export class AppRouterModule {
}
