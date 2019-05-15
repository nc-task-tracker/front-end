import { Component, OnInit } from '@angular/core';
import {allComments} from '../../../models/Constants/comments';
import {Ticket} from '../../../models/ticket.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {Router} from '@angular/router';
import {Observable, ObservableInput} from 'rxjs';
import {User} from '../../../models/user.model';
import {defaultProgress} from '@angular-devkit/build-angular/src/utils';
import {defaultProfile} from '../../../models/profile.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  readonly currentUser: Observable<User>;
  comments = allComments;
  ticket: Ticket;
  commentForm: FormGroup;
  displayedColumns: string[] = ['User', 'Text', 'Time'];

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.commentForm = this.fb.group({
      issueId: ['1'],
      profile: [defaultProfile],
      commentText: ['']
    })
  }

  //   onSendClick () {
  //     this.ngRedux.dispatch(saveCommentAction(this.commentForm.getRawValue()));
  //     this.formInit();
  // }
}
