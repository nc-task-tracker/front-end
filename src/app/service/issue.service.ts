import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Issue} from "../models/issue.model";

@Injectable()
export class IssueService{

  private ISSUE_URL = '/api/issue';

  constructor(private httpClient: HttpClient){}

  getIssuesByProjectId(projectId: string): Observable<Issue[]>{
    return this.httpClient.get<Issue[]>(`${this.ISSUE_URL}/project/${projectId}`);
  }

}
