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
import {CreateTicketModalComponent} from '../../create-ticket-modal/create-ticket-modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TicketType} from '../../../models/Enums/TicketType.enum';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {

  @Input() ticket: Ticket;
  createSubtask = false;

  displayedColumns: string[] = ['Name', 'Description', 'Status'];

  constructor(private ticketService: TicketService, private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder, private router: Router,
              private matDialog: MatDialog) { }

  ngOnInit() {
    if (this.ticket.issueType == TicketType.SUBTASK) this.createSubtask = true;
  }

  onClickAddSubTicket(ticket: Ticket): void {
    console.log(ticket);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isSubTask: true,
      parentTicket: ticket
    };

    dialogConfig.autoFocus = true;
    this.matDialog.open(CreateTicketModalComponent, dialogConfig);
  }

  selectSubtask(subtask: Ticket) {
    location.assign(`/ticket/${subtask.id}`)
  }
}
