import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatToolbarModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class ToolbarModule { }
