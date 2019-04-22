import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project.model";

@Injectable()
export class ProjectService {

  private PROJECTS_URL = 'api/project';

  constructor(private httpClient: HttpClient) {
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.httpClient.get<Project>(`${this.PROJECTS_URL}/${projectId}`);
  }

  getProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.PROJECTS_URL}/all`);
  }

}
