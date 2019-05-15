import {
  MatButtonModule, MatCardModule, MatCellDef, MatDatepickerModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
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
    MatTableModule,
    MatProgressSpinnerModule
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
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
