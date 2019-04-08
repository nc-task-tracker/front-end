import {Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class GlobalUserStorageService {
  private USER_KEY = 'currentUser';

  set currentUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }

  constructor() {
  }

  asObservable() {
    return fromEvent(window, 'storage');
  }

}
