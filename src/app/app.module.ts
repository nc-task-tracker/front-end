import {AppComponent} from './app.component';
import {UserComponent} from './components/user/user.component';
import {CreateTicketPageComponent} from './components/create-ticket-page/create-ticket-page.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ChangeProfileComponent} from './components/change-profile/change-profile.component';
import {BrowserModule} from '@angular/platform-browser';
import {EpicsModule} from './store/epics/epics.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {MaterialModule} from './material.module';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserListModule} from './components/user-list/user-list.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogsModule} from './components/dialogs/dialogs.module';
import {AppRouterModule} from './app-router.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material';
import {EpicService} from './store/epics/epics.service';
import {TransformService} from './utils/transform.service';
import {RegisterService} from './service/register.service';
import {UserService} from './service/user.service';
import {AuthService} from './service/auth.service';
import {TicketService} from './service/ticket.service';
import {ProjectService} from './service/project.service';
import {TicketServiceService} from './service/ticket-service.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AppState} from './store';
import {GlobalUserStorageService} from './service/global-storage.service';
import {createEpicMiddleware} from 'redux-observable';
import {reducers} from './store/reducers/reducers';
import {createLogger} from 'redux-logger';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from "./components/welcome/welcome.component";


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateTicketPageComponent,
    TicketComponent,
    CreateProjectComponent,
    CreateFilterComponent,
    ProfileComponent,
    ChangeProfileComponent,
    WelcomeComponent
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
    MatGridListModule
  ],
  providers: [
    EpicService,
    TransformService,
    RegisterService,
    UserService,
    AuthService,
    TicketService,
    ProjectService,
    TicketServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
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
