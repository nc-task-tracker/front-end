import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Ticket} from '../models/ticket.model';
import {Profile} from '../models/profile.model';


@Injectable()
export class ProfileService {

  private PROJECTS_URL = '/api/project';
  private PROFILE_URL = '/api/profile';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]> (`${this.PROJECTS_URL}/all`)
      .pipe (catchError ((error: any) => throwError (error.error)));
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.PROFILE_URL}/${profileId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
