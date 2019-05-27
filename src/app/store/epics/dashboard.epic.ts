import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import {DashboardService} from "../../service/dashboard.service";
import {CREATE_DASHBOARD, createDashboardSuccessAction} from "../actions/create-dashboard.actions";

@Injectable()
export class DashboardEpic {
  constructor(private dashboardService: DashboardService){}

  createDashboard$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_DASHBOARD).pipe(
      switchMap(({payload}) => {
        return this.dashboardService
          .createDashboard(payload.dashboard)
          .pipe(
            map( dashboard => createDashboardSuccessAction(dashboard))
          );
      })
    );
  }
}
