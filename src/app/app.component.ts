import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {GlobalUserStorageService} from './service/global-storage.service';
import {AppState} from './store';
import {logoutUserAction, updateCurrentUserAction} from './store/actions/current-user.actions';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngRedux: NgRedux<AppState>, private localStorageService: GlobalUserStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.localStorageService.asObservable().subscribe((user: Event) => {
      if (this.localStorageService.currentToken && this.localStorageService.currentUser) {
        this.ngRedux.dispatch(updateCurrentUserAction(this.localStorageService.currentUser));
      } else {
        this.ngRedux.dispatch(logoutUserAction());
      }
    });
  }
}
