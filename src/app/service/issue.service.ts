import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Issue} from "../models/issue.model";
import {Sort} from "@angular/material";
import {SortParameters} from "../models/tableSort/sortParameters.model";

@Injectable()
export class IssueService{

  private ISSUE_URL = '/api/issue';

  constructor(private httpClient: HttpClient){}

  getIssuesByProjectId(projectId: string): Observable<Issue[]>{
    return this.httpClient.get<Issue[]>(`${this.ISSUE_URL}/project/${projectId}`);
  }

  getSortedIssues(projectId: string, sort: SortParameters):Observable<Issue[]>{
    return this.httpClient.post<Issue[]>(`${this.ISSUE_URL}/project/${projectId}/sort`,sort);
  }

}
