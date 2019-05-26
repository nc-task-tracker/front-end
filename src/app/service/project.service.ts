import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Project} from "../models/project.model";

@Injectable()
export class ProjectService {

  private PROJECT_URL = '/api/project';
  private CREATE_PROJECT_URL = '/api/project/create';

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.CREATE_PROJECT_URL}`, project)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  searchProject(name?: string, code?: string): Observable<Project[]> {
    let params = new HttpParams();
    if(name) {
      params = params.append('name', name);
    }
    if(code) {
      params = params.append('code', code);
    }
    return this.http.get<Project[]>(this.PROJECT_URL, {
       params: params
    });
  }
}
