import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatIconModule} from "@angular/material";
import { WidgetComponent } from './widget/widget.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class DashboardModule { }
