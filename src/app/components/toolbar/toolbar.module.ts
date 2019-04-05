import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
