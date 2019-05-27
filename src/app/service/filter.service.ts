import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filter} from "../models/filter-item.model";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Dashboard} from "../models/dashboard.model";

@Injectable()
export class FilterService {
  private readonly FILTER_URL = '/api/filter';

  constructor (private http: HttpClient) {}

  createFilter(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(`${this.FILTER_URL}`, filter)
      .pipe(catchError(err => throwError(err)));
  }

  deleteFilter(id: string): Observable<{}> {
    return this.http.delete(`${this.FILTER_URL}/delete/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getFilter(filterId: string): Observable<Filter> {
    return this.http.get<Filter>(`${this.FILTER_URL}/${filterId}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(`${this.FILTER_URL}/all`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getFilterList(): Observable<Filter[]> {
    return this.http.get<Filter[]>(`${this.FILTER_URL}/all`);
  }
}
