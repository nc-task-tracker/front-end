import {Component, Input, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Ticket} from '../../../models/ticket.model';
import {selectCurrentTicketComments} from '../../../store/selectors/current-ticket.selector';
import {Comment} from '../../../models/comment.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  @Input() subtasks: Ticket[];

  displayedColumns: string[] = ['Name', 'Description', 'Status'];
  haveSubtasks = false;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (this.subtasks.length > 0) this.haveSubtasks = true;
    console.log(    this.subtasks.length);
  }

  onCreateSubtaskClick() {
    this.router.navigate(['create-ticket']);
  }

  selectSubtask(subtask: Ticket) {
    location.assign(`/ticket/${subtask.id}`)
  }
}
