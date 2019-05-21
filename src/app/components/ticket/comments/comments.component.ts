import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgRedux, select} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {selectCurrentUser} from '../../../store/selectors/current-user.selector';
import {saveCommentAction} from '../../../store/actions/tickets.actions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('issue_Id') issue_Id: string;
  @Input() have_Comments: boolean;
  @Input('comments') comments: Set<Comment>;

  currentUser: User;
  commentForm: FormGroup;
  displayedColumns: string[] = ['User', 'Text', 'Time'];

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
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
      this.ngRedux.dispatch(saveCommentAction(this.commentForm.getRawValue(), this.issue_Id));
      this.formInit();
  }
}
