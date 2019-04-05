import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from 'src/app/store';
import { selectUser } from 'src/app/store/actions/user-state.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { selectUserFromState } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @select(selectUserFromState)
  userModel: Observable<User>;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.ngRedux.dispatch(selectUser(userId));
  }

}
