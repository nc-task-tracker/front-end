import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ProjectMember} from "../models/project-member.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Profile} from "../models/profile.model";

@Injectable()
export class ProjectMemberService {
  private PROJECT_MEMBER_URL = "/api/project/members";
  private PROJECT_URL = "/api/project";

  constructor(private http: HttpClient){}

  getAllByProjectId(id: string): Observable<ProjectMember[]>{
    return this.http.get<ProjectMember[]>(`${this.PROJECT_MEMBER_URL}/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)))
  }

  deleteMember(projectId: string, memberId): Observable<{}>{
    return this.http.delete(`${this.PROJECT_MEMBER_URL}/delete/${projectId}/${memberId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getNoProjectMembers(id: string): Observable<Profile[]>{
    return this.http.get<Profile[]>(`${this.PROJECT_MEMBER_URL}/${id}/possible`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
