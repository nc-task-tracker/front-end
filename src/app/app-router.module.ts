import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {ProjectPageComponent} from "./components/project-page/project-page.component";

const routs: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
    {path: 'register', component: EditUserComponent},
    {path: 'project', component:ProjectPageComponent}

];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
