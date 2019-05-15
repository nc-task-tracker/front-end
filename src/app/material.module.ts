import {
  MatButtonModule, MatCardModule, MatCellDef, MatDatepickerModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatTableModule, MatTabsModule,
  MatTooltipModule, MatTreeModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class MaterialModule {}
