import {Component, Input, OnInit} from '@angular/core';
import {allSubtasks} from '../../../models/Constants/subtasks';
import {NgRedux} from '@angular-redux/store';
import {TicketService} from '../../../service/ticket.service';
import {AppState} from '../../../store';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {selectTicket} from '../../../store/actions/tickets.actions';
import {defaultTicket, Ticket} from '../../../models/ticket.model';
import {updateRouterState} from '../../../store/actions/router.actions';
import {openSubtask, updateCurrentTicketAction} from '../../../store/actions/current-ticket.action';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  @Input() createSubtask: boolean;
  @Input() subtasks: Set<Ticket>;

  displayedColumns: string[] = ['Name', 'Description', 'Status'];
  haveSubtasks = true;

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // if (this.subtasks.size !== undefined) this.haveSubtasks = true;
    console.log(this.subtasks.size);
  }

  onCreateSubtaskClick() {
    this.router.navigate(['create-ticket']);
  }

  // onSubtaskClick (subtaskId: string) {
  //   this.ngRedux.dispatch(selectTicket(subtaskId));
  //   const ticketURL = 'ticket/' + subtaskId;
  //   this.router.navigate([ticketURL]);
  // }

  selectSubtask(subtask: Ticket) {
    this.ngRedux.dispatch(updateRouterState(`/ticket/${subtask.id}`));
    this.ngRedux.dispatch(openSubtask(defaultTicket));
    // this.ngRedux.dispatch(updateCurrentTicketAction(subtask));
  }
}
