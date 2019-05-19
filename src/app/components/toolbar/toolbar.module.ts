import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatIconModule, MatCardModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {MatTreeModule} from "@angular/material/typings/tree";

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
    MatTreeModule,
    MatCardModule
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
