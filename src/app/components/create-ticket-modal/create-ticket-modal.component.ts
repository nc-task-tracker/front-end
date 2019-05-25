import {Component, ElementRef, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material';
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../../store/selectors/current-user.selector';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
import {catchError, debounceTime, distinctUntilChanged, filter, startWith, switchMap} from 'rxjs/operators';
import {TicketService} from '../../service/ticket.service';
import {Project} from '../../models/project.model';
import {Assignee} from '../../models/assignee.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {allTicketPriority, allTicketType, Ticket} from '../../models/ticket.model';
import {AppState} from '../../store';
import {GlobalUserStorageService} from '../../service/global-storage.service';
import {Router} from '@angular/router';
import {createTicketAction} from '../../store/actions/tickets.actions';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})
export class CreateTicketModalComponent implements OnInit {

  isSubTask = this.data.isSubTask;

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  isShowFullName = true;
  multiple = false;
  projectPlaceholder = 'Choose project';
  valueTitleKeyAssignee = 'login';
  valueTitleKeyProject = 'projectName';

  assigneePlaceholder = 'Choose assignee';
  ticketForm: FormGroup;


  ticketPriority = allTicketPriority;
  ticketTypes = allTicketType;

  parentTicket = this.data.ticket;

  parentTicketName: string;

  minDate = new Date();
  possibleProjects;

  constructor(
    private formBuilder: FormBuilder,
    private ngRedux: NgRedux<AppState>,
    private router: Router,
    private storageService: GlobalUserStorageService,
    public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService,
  ) {
  }


  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      issueName: ['', Validators.required],
      issueDescription: ['', Validators.required],
      dueDate: ['', Validators.required],
      project: ['', Validators.required],
      issueType: ['', Validators.required],
      issuePriority: ['', Validators.required],
      assignee: ['', Validators.required],
      reporter: this.storageService.currentUser.id,
      minDate: new Date()

    });
    if (this.isSubTask) {
      console.log(this.data);
      this.parentTicket = this.data.parentTicket;
      this.parentTicketName = this.data.parentTicket.issueName;
      this.ticketForm.controls.issueType.setValue('SUB_TASK');
      console.log('ass', this.data.assignee);
      this.ticketForm.controls.assignee.setValue(this.data.assignee);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTicket() {
    const formValue = this.ticketForm.getRawValue();
    console.log('fv', formValue);
    this.ngRedux.dispatch(createTicketAction(formValue as any));
    this.ticketService.createTicket(formValue).subscribe();
    this.dialogRef.close();
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }
}
