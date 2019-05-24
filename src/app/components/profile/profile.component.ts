import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgRedux} from "@angular-redux/store";
import {GlobalUserStorageService} from "../../service/global-storage.service";

import {AppState} from "../../store";
import {fetchProfileAction} from "../../store/actions/Profile.action";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: GlobalUserStorageService,
                private ngRedux: NgRedux<AppState>) { }

  isLogin: boolean = false;

  ngOnInit() {
     const {userId} = this.route.snapshot.params;
     const user = this.localStorage.currentUser;
     this.isLogin = user && user.id === userId;
     this.ngRedux.dispatch(fetchProfileAction(userId));
  }
}
