import {
  MatButtonModule, MatCardModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatTableModule, MatTabsModule,
  MatTooltipModule, MatTreeModule,
  MatPaginatorModule,
  MatSortModule,
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
    MatProgressSpinnerModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule
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
    MatProgressSpinnerModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule
  ]
})
export class MaterialModule {}
