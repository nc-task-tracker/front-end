import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import {ProfileComponent} from "./profile.component";
import {MaterialModule} from "../../material.module";
import { ActionsComponent } from './actions/actions.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { FiltersComponent } from './filters/filters.component';
import { ProjectsComponent } from './projects/projects.component';
import {MatMenuModule} from "@angular/material";
// import { MatConfirmationDialogComponent } from './mat-confirmation-dialog/mat-confirmation-dialog.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    ActionsComponent,
    DashboardsComponent,
    FiltersComponent,
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MatMenuModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {

}
