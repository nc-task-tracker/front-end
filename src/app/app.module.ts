import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import {OverlayModule} from '@angular/cdk/overlay';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material';
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
import {MatAutocompleteModule, MatDialogModule} from '@angular/material';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {AppState} from './store';
import {reducers} from './store/reducers/reducers';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {GlobalUserStorageService} from './service/global-storage.service';
import {FilterFormModule} from './components/form-filter/filter-form.module';
import {FilterService} from './service/filter.service';
import {AuthGuardService} from './service/auth-guard.service';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {MatConfirmDialogComponent} from './components/util/mat-confirmation-dialor/mat-confirm-dialog.component';
import {MatConfirmDialogService} from './components/util/mat-confirmation-dialor/mat-confirm-dialog.service';
import {ProjectsPageComponent} from './components/projects-page/projects-page.component';
import {ProjectNameValidator} from './validators/project.name.validator';
import {ProjectCodeValidator} from './validators/project.code.validator';
import {JwtHelperService} from '@auth0/angular-jwt';

// import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TicketService} from './service/ticket.service'; // <-- NgModel lives here
import { MaterialModule } from './material.module';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileModule} from './components/profile/profile.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {RegisterService} from './service/register.service';
import {ChangeProfileService} from './service/change-profile-service.service';
import {ProfileService} from './service/profile.service';
//import {TicketServiceService} from './service/ticket-service.service';


const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('currentToken'),
    whitelistedDomains: ['localhost:4200/home']
  }
};
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';
import {EmailSenderService} from './service/email-sender.service';
import {ProjectMemberComponent} from './components/project-member/project-member.component';
import {ProjectMemberService} from './service/project-member.service';
import {NgModule} from '@angular/core';
import {ProjectService} from './service/project.service';
import {AbstractSelectFormComponent} from './components/form-filter/abstract-select-form/abstract-select-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChangeProfileComponent,
    TicketComponent,
    CreateProjectComponent,
    // ProfileComponent,
    ChangeProfileComponent,
    ProjectsPageComponent,
    ProjectPageComponent,
    MatConfirmDialogComponent,
    WelcomeComponent,
    CreateTicketModalComponent,
    ProjectMemberComponent
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
    JwtModule.forRoot(JWT_Module_Options),
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
    FilterFormModule,
    ProfileModule
  ],
  providers: [
    EpicService,
    TransformService,
    RegisterService,
    UserService,
    AuthService,
    ProfileService,
    TicketService,
    ProjectService,
    MatConfirmDialogService,
    //TicketServiceService,
    FilterService,
    ProjectNameValidator,
    ProjectCodeValidator,
    AuthGuardService,
    EmailSenderService,
    ProjectMemberService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ChangeProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MatConfirmDialogComponent,
    CreateTicketModalComponent
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
