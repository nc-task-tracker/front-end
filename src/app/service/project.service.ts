import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Project} from "../models/project.model";

@Injectable()
export class ProjectService {

  private PROJECT_URL = '/api/project';

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.PROJECT_URL}`, project)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.PROJECT_URL}/${projectId}`);
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.PROJECT_URL}/all`);
  }
}
