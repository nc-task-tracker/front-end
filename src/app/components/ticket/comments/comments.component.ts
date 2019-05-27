import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgRedux, select} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {selectCurrentUser} from '../../../store/selectors/current-user.selector';
import {selectCurrentTicket, selectCurrentTicketComments} from '../../../store/selectors/current-ticket.selector';
import {Ticket} from '../../../models/ticket.model';
import {Observable} from 'rxjs';
import {deleteCurrentTicketComment, saveCurrentTicketCommentAction} from '../../../store/actions/current-ticket.action';
import {Comment} from '../../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('issue_Id') issue_Id: string;
  @select(selectCurrentTicketComments)
    comments: Observable<Comment[]>;

  haveComments = false;
  currentUser: User;
  commentForm: FormGroup;
  displayedColumns: string[] = ['User', 'Text', 'Time', 'Delete'];

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    console.log(this.issue_Id);
    this.currentUser = selectCurrentUser(this.ngRedux.getState());
    this.formInit();
  }

  formInit() {
    this.commentForm = this.fb.group({
      profileId: ['1'],
      commentText: ['']
    })
  }

  onSaveClick () {
    this.ngRedux.dispatch(saveCurrentTicketCommentAction(this.commentForm.getRawValue(), this.issue_Id));
  }

  onDeleteCommentClick(comment: Comment) {
    console.log(comment.id);
    this.ngRedux.dispatch(deleteCurrentTicketComment(comment.id));
  }
}
