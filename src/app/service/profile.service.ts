import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ProfileService {

  private PROJECTS_URL = '/api/project';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]> (`${this.PROJECTS_URL}/all`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }
}
