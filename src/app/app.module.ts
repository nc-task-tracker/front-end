import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { OverlayModule } from '@angular/cdk/overlay';
import {AppComponent} from './app.component';
import {UserComponent} from './components/user/user.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {BrowserModule} from '@angular/platform-browser';
import {EpicsModule} from './store/epics/epics.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterService} from './service/register.service';
import {MatAutocompleteModule, MatDialogModule, MatGridListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {AppRouterModule} from './app-router.module';
import {DialogsModule} from './components/dialogs/dialogs.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {UserListModule} from './components/user-list/user-list.module';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {AppState} from './store';
import {EpicService} from './store/epics/epics.service';
import {reducers} from './store/reducers/reducers';
import {TicketService} from './service/ticket.service';
import {ProjectService} from './service/project.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {GlobalUserStorageService} from './service/global-storage.service';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {MatConfirmDialogComponent} from './components/util/mat-confirmation-dialor/mat-confirm-dialog.component';
import {MatConfirmDialogService} from './components/util/mat-confirmation-dialor/mat-confirm-dialog.service';
import {ProjectsPageComponent} from './components/projects-page/projects-page.component';
import {ProjectNameValidator} from './validators/project.name.validator';
import {ProjectCodeValidator} from './validators/project.code.validator';
import {AuthGuardService} from './service/auth-guard.service';
import {ProfileModule} from './components/profile/profile.module';
import {EmailSenderService} from './service/email-sender.service';
import {ProjectMemberComponent} from './components/project-member/project-member.component';
import {ProjectMemberService} from './service/project-member.service';
import {AssigneeSearchComponent} from './components/create-ticket-modal/assignee-search/assignee-search.component';
import {AbstractSearchFormComponent} from './components/create-ticket-modal/abstract-search-form/abstract-search-form.component';
import {RegisterComponent} from './components/register/register.component';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {ChangeProfileService} from "./service/change-profile-service.service";
import {ProfileService} from "./service/profile.service";
import {TicketModule} from './components/ticket/ticket.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CreateTicketModalComponent} from './components/create-ticket-modal/create-ticket-modal.component';
import {AssigneeFormComponent} from './components/assignee-form/assignee-form.component';
import {TransformService} from './utils/transform.service';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('currentToken'),
    whitelistedDomains: ['localhost:4200/home']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateTicketPageComponent,
    ChangeProfileComponent,
    CreateProjectComponent,
    ProjectsPageComponent,
    ProjectPageComponent,
    MatConfirmDialogComponent,
    WelcomeComponent,
    RegisterComponent,
    CreateTicketModalComponent,
    AssigneeFormComponent,
    ProjectMemberComponent,
    AssigneeSearchComponent,
    AbstractSearchFormComponent
  ],
  imports: [
    BrowserModule,
    EpicsModule,
    FormsModule,
    ReactiveFormsModule,
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
    ProfileModule,
    TicketModule
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
    ProjectNameValidator,
    ProjectCodeValidator,
    AuthGuardService,
    EmailSenderService,
    ProjectMemberService,
    ChangeProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent,
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
