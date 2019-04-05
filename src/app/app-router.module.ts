import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { NgModelGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routs: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
    {path: 'user/:id', component: UserComponent}
];

@NgModule({
   imports: [
       RouterModule.forRoot(routs)
   ]
})
export class AppRouterModule {}
