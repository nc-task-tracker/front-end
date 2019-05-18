import {Component, OnInit} from "@angular/core";
import {LoginUserComponent} from "../dialogs/login-user/login-user.component";
import {Router} from "@angular/router";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser} from "../../store/selectors/current-user.selector";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {AppState} from '../../store';
import {fetchTicketsAction} from '../../store/actions/tickets.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit{
  @select(selectCurrentUser)
  currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>){}

  ngOnInit(): void {
    this.ngRedux.dispatch(fetchTicketsAction());
  }

}
