import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {ProjectMember} from "../models/project-member.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Profile} from "../models/profile.model";
import {SortParameters} from "../models/util/table-sort-param.model";
import {TablePageData} from "../models/util/table-page-data.model";
import {Project} from "../models/project.model";

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
    return this.http.delete(`${this.PROJECT_MEMBER_URL}/${projectId}/${memberId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getNoProjectMembers(id: string): Observable<Profile[]>{
    return this.http.get<Profile[]>(`${this.PROJECT_MEMBER_URL}/${id}/possible`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  addMember(profileId: string,projectMember: ProjectMember): Observable<ProjectMember>{
    return this.http.post<ProjectMember>(`${this.PROJECT_MEMBER_URL}/${profileId}/add`, projectMember)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getTablePageData(id: string, parameters: SortParameters): Observable<TablePageData<ProjectMember>>{
    return this.http.post<TablePageData<ProjectMember>>(`${this.PROJECT_MEMBER_URL}/project/${id}/sort`,parameters)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
