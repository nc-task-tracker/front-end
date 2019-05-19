import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Rx';
import {Assignee} from '../models/assignee.model';
import {Project} from '../models/project.model';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  private readonly DASHBOARD_URL = '/api/dashboard';
  private readonly GET_PROJECTS = '/api/project/possibleprojects';


  getDashboardList(inputValue: string): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(`${this.DASHBOARD_URL}/${inputValue}`, {
      params: {
        name: inputValue
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
