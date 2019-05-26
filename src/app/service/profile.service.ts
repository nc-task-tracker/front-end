import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Profile} from "../models/profile.model";
import {Dashboard} from "../models/dashboard.model";
import {Filter} from "../models/filter-item.model";

@Injectable()
export class ProfileService {

  private DASHBOARDS_URL = '/api/dashboard';
  private FILTERS_URL = '/api/filter';
  private PROJECTS_URL = '/api/project';
  private PROFILE_URL = '/api/profile';


  constructor(private http: HttpClient) {
  }
  getProfile(profileId: string): Observable<Profile> {
    return this.http.get<Profile> (`${this.PROFILE_URL}/${profileId}`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }
  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]> (`${this.DASHBOARDS_URL}/all/{id}`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }
  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]> (`${this.FILTERS_URL}/all`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]> (`${this.PROJECTS_URL}/all`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }
}
