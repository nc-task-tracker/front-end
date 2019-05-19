import {Component, OnInit} from "@angular/core";
import {LoginUserComponent} from "../dialogs/login-user/login-user.component";
import {Router} from "@angular/router";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {select} from "@angular-redux/store";
import {selectCurrentUser} from "../../store/selectors/current-user.selector";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit{
  @select(selectCurrentUser)
  currentUser: Observable<User>;


  ngOnInit(): void {
  }

  constructor(){}
}
