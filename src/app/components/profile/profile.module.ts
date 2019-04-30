import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule,
  MatDialogModule,
} from '@angular/material';
import {RouterModule} from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import {ProfileComponent} from "./profile.component";
import {MaterialModule} from "../../material.module";
import { ActionsComponent } from './actions/actions.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { FiltersComponent } from './filters/filters.component';
import { ProjectsComponent } from './projects/projects.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    ActionsComponent,
    DashboardsComponent,
    FiltersComponent,
    ProjectsComponent,
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {

}
