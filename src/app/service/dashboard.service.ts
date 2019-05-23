import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {Project} from '../models/project.model';
import {Dashboard} from "../models/dashboard.model";

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  private readonly DASHBOARD_URL = '/api/dashboard';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';


  getDashboardList(idUser: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.DASHBOARD_URL}/${idUser}/allDashboards`, {
      params: {
        name: idUser
      }
    });
  }

  getPossibleProjectsByUser(userName: string) {
    console.log(userName);
    return this.http.get<Project[]>(`${this.GET_PROJECTS}`, {
      params: {
        name: userName
      }
    });
  }
}
