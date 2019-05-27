import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MaterialModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
