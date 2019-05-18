import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { OverlayModule } from '@angular/cdk/overlay';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule, MatDialogModule, MatGridListModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { UserListModule } from './components/user-list/user-list.module';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { EpicsModule } from './store/epics/epics.module';
import { EpicService } from './store/epics/epics.service';
import { TransformService } from './utils/transform.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AppState} from './store';
import {GlobalUserStorageService} from './service/global-storage.service';
import {createEpicMiddleware} from 'redux-observable';
import {reducers} from './store/reducers/reducers';
import {createLogger} from 'redux-logger';
import {NgModule} from '@angular/core';
import {ProjectNameValidator} from './validators/project.name.validator';
import {ProjectCodeValidator} from './validators/project.code.validator';
import {AuthGuardService} from './service/auth-guard.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TicketService} from './service/ticket.service'; // <-- NgModel lives here
import { MaterialModule } from './material.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';
import {ProfileModule} from './components/profile/profile.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {RegisterService} from './service/register.service';
import {ProjectService} from './service/project.service';
import { CreateTicketModalComponent } from './components/create-ticket-modal/create-ticket-modal.component';
import { AssigneeFormComponent } from './components/assignee-form/assignee-form.component';
import {ChangeProfileService} from "./service/change-profile-service.service";
import {from} from "rxjs";


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChangeProfileComponent,
    TicketComponent,
    CreateProjectComponent,
    WelcomeComponent,
    CreateTicketModalComponent,
    AssigneeFormComponent
  ],
  imports: [
    BrowserModule,
    EpicsModule,
    FormsModule,
    // import main NgReduxModule
    NgReduxModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    UserListModule,
    BrowserAnimationsModule,
    OverlayModule,
    DialogsModule,
    MatDialogModule,
    MatAutocompleteModule,
    AppRouterModule,
    RouterModule,
    ToolbarModule,
    MatGridListModule,
    ProfileModule
  ],
  providers: [
    EpicService,
    TransformService,
    RegisterService,
    UserService,
    AuthService,
    TicketService,
    ProjectService,
    ProjectNameValidator,
    ProjectCodeValidator,
    AuthGuardService,
    ChangeProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateTicketModalComponent,
  ]
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

    const INITIAL_STATE: AppState = {currentUser} as AppState;

    ngRedux.configureStore(reducers, INITIAL_STATE, [middleware, createLogger()], enhancers);
    middleware.run(epics as any);
    ngReduxRouter.initialize(state => state.route);
  }
}
