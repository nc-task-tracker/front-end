import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule,
  MatDialogModule, MatIconModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class ProfileModule {
  declarations: [UserInfoComponent]
  entryComponents: [UserInfoComponent]
}
