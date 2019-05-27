import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { OverlayModule } from '@angular/cdk/overlay';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { UserListModule } from './components/user-list/user-list.module';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { AppState } from './store';
import { EpicsModule } from './store/epics/epics.module';
import { EpicService } from './store/epics/epics.service';
import { reducers } from './store/reducers/reducers';
import { TransformService } from './utils/transform.service';
import { GlobalUserStorageService } from './service/global-storage.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import { CreateTicketPageComponent } from './components/create-ticket-page/create-ticket-page.component';
import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';
import {DashboardModule} from "./components/dashboard/dashboard.module";
import {CreateTicketModalComponent} from "./components/create-ticket-modal/create-ticket-modal.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {TicketComponent} from "./components/ticket/ticket.component";
import {WelcomeModule} from "./components/welcome/welcome.module";
import {MatAutocompleteModule, MatDialogModule, MatGridListModule, MatMenuTrigger} from "@angular/material";
import {TicketService} from "./service/ticket.service";
import {ProjectService} from "./service/project.service";
import {DashboardService} from "./service/dashboard.service";
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {ProfileModule} from "./components/profile/profile.module";
import {RegisterService} from "./service/register.service";
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateTicketPageComponent,
    ProfileComponent,
    ChangeProfileComponent,
    CreateTicketModalComponent,
    CreateProjectComponent,
    CreateDashboardComponent,
    TicketComponent,
    SearchModalComponent,
  ],

  imports: [
    BrowserModule,
    EpicsModule,
    FormsModule,
    ReactiveFormsModule,
    // import main NgReduxModule
    NgReduxModule,
    MaterialModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    UserListModule,
    BrowserAnimationsModule,
    OverlayModule,
    DialogsModule,
    MatDialogModule,
    AppRouterModule,
    RouterModule,
    ToolbarModule,
    DashboardModule,
    WelcomeModule,
    MatAutocompleteModule,
    MatGridListModule,
    ProfileModule,
  ],
  providers: [
    EpicService,
    TransformService,
    UserService,
    AuthService,
    TicketService,
    ProjectService,
    DashboardService,
    EpicService,
    TransformService,
    RegisterService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent],
  entryComponents:[SearchModalComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<AppState>,
    private ngReduxRouter: NgReduxRouter,
    private epicService: EpicService, private devTools: DevToolsExtension,
    private localStorageService: GlobalUserStorageService) {

    const epics = this.epicService.getEpics();
    const middleware = createEpicMiddleware();
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [devTools.enhancer()];
    }

    const currentUser = localStorageService.currentUser;

    const INITIAL_STATE: AppState = {currentUser}as AppState;

    ngRedux.configureStore(reducers, INITIAL_STATE, [middleware, createLogger()], enhancers);
    middleware.run(epics as any);
    ngReduxRouter.initialize(state => state.route);
  }
}
