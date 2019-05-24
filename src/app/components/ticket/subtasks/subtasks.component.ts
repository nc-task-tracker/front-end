import { Component, OnInit } from '@angular/core';
import {allSubtasks} from '../../../models/Constants/subtasks';
import {NgRedux} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {updateRouterState} from '../../../store/actions/router.actions';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  subtasks = allSubtasks;
  displayedColumns: string[] = ['Name', 'Description', 'Status'];

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  onCreateSubtaskClick() {
    this.router.navigate(['create-ticket']);
  }

  // selectSubtask(subtaskId: string) {
  //   this.ngRedux.dispatch(updateRouterState(`/subtask/${subtaskId}`));
  // }
}
