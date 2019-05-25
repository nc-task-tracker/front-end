import {Component, OnInit} from "@angular/core";
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

  test = new Date();

  constructor(private ngRedux: NgRedux<AppState>){}

  ngOnInit(): void {
  }
}
