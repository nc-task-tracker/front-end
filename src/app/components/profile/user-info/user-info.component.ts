import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {selectCurrentIsLoading, selectCurrentTicket} from "../../../store/selectors/current-ticket.selector";
import {NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs";
import {selectProfile, selectProfileIsLoading} from "../../../store/selectors/profile.selector";
import {Profile} from "../../../models/profile.model";
import {AppState} from "../../../store";
import {fetchProfileAction} from "../../../store/actions/Profile.action";
import {GlobalUserStorageService} from "../../../service/global-storage.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  fullName: string;
  email: string;
  skype: string;
  telephone: string;
  additional: string;
  birthday: string;
  description: string;

  profile: Profile;

  @select(selectProfileIsLoading)
  isLoading: Observable<boolean>;

  onChangeClick() {
    this.router.navigate (['change-profile']);
    const {userId} = this.route.snapshot.params;
    this.ngRedux.dispatch(fetchProfileAction(userId));
  }
  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: GlobalUserStorageService,
              private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.isLoading.subscribe( val => {
      console.log(val);
      if(!val) {
         this.profile = selectProfile(this.ngRedux.getState());
      }
    });
  }
}
