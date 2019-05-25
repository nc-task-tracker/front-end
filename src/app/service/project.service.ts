import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {SortParameters} from '../models/util/table-sort-param.model';
import {TablePageData} from '../models/util/table-page-data.model';
import {User} from '../models/user.model';
import {SearchByName} from '../components/form-filter/abstract-select-form/abstract-select-form.component';
import {select} from '@angular-redux/store';
import {selectCurrentUser} from '../store/selectors/current-user.selector';

@Injectable()
export class ProjectService implements SearchByName<Project> {

  private PROJECT_URL = '/api/project';
  private PROJECT_NAME_URL = '/api/project';

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.PROJECT_URL}`, project)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.PROJECT_URL}/${projectId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjectByCode(projectCode: string): Observable<Project> {
    return this.http.get<Project>(`${this.PROJECT_URL}/${projectCode}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.PROJECT_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getTablePageData(parameters: SortParameters): Observable<TablePageData<Project>> {
    return this.http.post<TablePageData<Project>>(`${this.PROJECT_URL}/all/sorted`, parameters)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  addAssigner(projectId: string, user: User): Observable<{}> {
    return this.http.post(`${this.PROJECT_URL}/add/assigner/${projectId}`, user)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteAssigner(projectId: string, userId: string): Observable<{}> {
    return this.http.delete(`${this.PROJECT_URL}/${projectId}/delete/assigner/${userId}`)
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

  searchByName(name: string): Observable<Project[]> {
    if (!name) {
      return this.http.get<Project[]>(`${this.PROJECT_URL}/all`)
        .pipe(catchError((error: any) => throwError(error.error)));
    } else {
      return this.http.get<Project[]>(`${this.PROJECT_URL}/name`, {
        params: {
          substring: name
        }
      });
    }
  }
}
