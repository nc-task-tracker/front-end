import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';

import {
  MatButton,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatRadioModule,
  MatSelectModule,
  MatTooltipModule, MatTreeModule,

} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatRadioModule,
    MatTreeModule

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule
    MatRadioModule,
    MatTreeModule

  ]
})
export class MaterialModule {}
