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

@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatButtonModule,
    // MatDialogModule,
    MaterialModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {

}
