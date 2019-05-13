import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select} from "@angular-redux/store";
import {changeProfile} from "../../store/selectors/change-profile.selector";
import {Observable} from "rxjs";
import {ChangeProfile} from "../../models/change-profile.model";
import {GlobalUserStorageService} from "../../service/global-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @select(changeProfile)
  changeProfile: Observable<ChangeProfile>;

    constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: GlobalUserStorageService) { }

  isLogin: boolean = false;

  ngOnInit() {
     const {userId} = this.route.snapshot.params;
     const user = this.localStorage.currentUser;
     this.isLogin = user && user.id === userId;

  }

}
