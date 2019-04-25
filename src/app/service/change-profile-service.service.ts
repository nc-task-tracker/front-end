import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChangeProfile} from '../models/change-profile.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

// TODO rename to TicketService
@Injectable()
export class ChangeProfileService {
  private readonly SAVE_URL = '/api/profile/change-profile';

  constructor(private http: HttpClient) {}

  changeProfile(changeProfile: ChangeProfile): Observable<ChangeProfile> {
    return this.http.post<ChangeProfile>(`${this.SAVE_URL}`, changeProfile)
      .pipe(catchError(err => throwError(err)));
  }

}
