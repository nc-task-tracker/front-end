import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';

import {
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


@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatTreeModule

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatTreeModule

  ]
})
export class MaterialModule {}
