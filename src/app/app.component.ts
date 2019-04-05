import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { GlobalUserStorageService } from './service/global-storage.service';
import { AppState } from './store';
import { updateCurrentUserAction } from './store/actions/current-user.actions';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngRedux: NgRedux<AppState>, private localStorageService: GlobalUserStorageService) { }

  ngOnInit() {
    this.localStorageService.asObservable().subscribe((user: Event) => {
       this.ngRedux.dispatch(updateCurrentUserAction(this.localStorageService.currentUser));
    });
  }
}
