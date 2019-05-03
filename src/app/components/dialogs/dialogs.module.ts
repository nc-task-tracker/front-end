import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule,
  MatDialogModule, MatIconModule
} from '@angular/material';
import { LoginUserComponent } from './login-user/login-user.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MaterialModule
  ],
  declarations: [LoginUserComponent],
  entryComponents: [LoginUserComponent]
})
export class DialogsModule { }
