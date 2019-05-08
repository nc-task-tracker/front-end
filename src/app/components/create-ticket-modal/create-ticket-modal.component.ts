import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../../store/selectors/current-user.selector';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
import {catchError, debounceTime, switchMap} from 'rxjs/operators';
import {TicketService} from '../../service/ticket.service';
import {Project} from '../../models/project.model';
import {Assignee} from '../../models/assignee.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {allTicketPriority, allTicketTypes} from '../../models/ticket.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})
export class CreateTicketModalComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private possibleProjects;
  private minDate = new Date();
  private ticketModalForm: FormGroup;
  private allTicketPriority = allTicketPriority;
  private allTicketTypes = allTicketTypes;
  private assignees;
  public autoCompleteControl = new FormControl();
  public assigneeAutoComplete$: Observable<Assignee[]> = null;
  private chosenAssignee;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {
  }

  ngOnInit() {
    this.getPossibleProjects(this.userName.toString()).subscribe(res => this.possibleProjects = res);

    this.ticketModalForm = this.fb.group({
      minDate: new Date(),
      issueName: [''],
      issueType: [''],
      issuePriority: [''],
      issueDescription: [''],
      assignee: []
    });
  }

  private getPossibleProjects(value: string): Observable<Project[]> {
    return this.ticketService.getProjectsByUser(value).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }


  private lookup(value: string): Observable<Assignee[]> {
    return this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
