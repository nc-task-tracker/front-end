import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Project} from "../models/project.model";
import {SortParameters} from "../models/util/table-sort-param.model";
import {TablePageData} from "../models/util/table-page-data.model";
import {User} from "../models/user.model";

@Injectable()
export class ProjectService {

  private PROJECT_URL = '/api/project';

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.PROJECT_URL}`, project)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.PROJECT_URL}/${projectId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.PROJECT_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getTablePageData(parameters: SortParameters): Observable<TablePageData<Project>>{
    return this.http.post<TablePageData<Project>>(`${this.PROJECT_URL}/all/sorted`,parameters)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  addAssigner(projectId: string,user: User): Observable<{}> {
    return this.http.post(`${this.PROJECT_URL}/add/assigner/${projectId}`,user)
      .pipe(catchError((error: any)=> throwError(error.error)));
  }

  deleteAssigner(projectId: string,userId: string): Observable<{}> {
    return this.http.delete(`${this.PROJECT_URL}/${projectId}/delete/assigner/${userId}`)
      .pipe(catchError((error: any)=> throwError(error.error)));
  }

  searchProject(name: string, code?: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.PROJECT_URL, {
       params: {
         name: name,
         code: code
       }
    });
  }
}
