import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../../store/selectors/current-user.selector';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {TicketService} from '../../service/ticket.service';
import {Project} from '../../models/project.model';
import {Assignee} from '../../models/assignee.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {allTicketPriority, allTicketTypes} from '../../models/ticket.model';
import {createTicketAction} from '../../store/actions/create-ticket.actions';
import {AppState} from '../../store';
import {GlobalUserStorageService} from '../../service/global-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})

export class CreateTicketModalComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;

  currentAssignee: Assignee;
  currentAssigneeId: String;

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  ticketForm: FormGroup;

  ticketPriority = allTicketPriority;
  ticketTypes = allTicketTypes;

  assigneeAuto: FormControl;
  assigneeAutoComplete$: Observable<Assignee[]>;
  minDate = new Date();

  public assignees: Observable<Assignee[]>;
  public assignee: FormControl;
  possibleProjects;

  constructor(
    private formBuilder: FormBuilder,
    private ngRedux: NgRedux<AppState>,
    private router: Router,
    private storageService: GlobalUserStorageService,
    public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {
  }

  ngOnInit() {
    // this.getPossibleProjects(this.userName.toString()).subscribe(res => this.possibleProjects = res);
    this.ticketForm = this.formBuilder.group({
      issueName: ['', Validators.required],
      issueDescription: ['', Validators.required],
      dueDate: ['', Validators.required],
      project: [''/*, Validators.required*/],
      issueType: ['', Validators.required],
      issuePriority: ['', Validators.required],
      parentId: [''],
     // assignee: this.formBuilder.control(['you']),
      assignee: [''],
      reporter: [''],
      minDate: new Date()

    });

    this.assigneeAuto = new FormControl();
    this.assigneeAutoComplete$ = this.ticketForm.controls.assignee.valueChanges.pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(value => this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
        catchError(_ => {
          return of(null);
        })
      ))
    );
  }

  chooseAssignee(item) {
    this.currentAssignee = item;
    this.ticketForm.controls.assignee.setValue(item.login);
    console.log(this.ticketForm.controls.assignee);
    this.assigneeAutoComplete$ = null;

    this.currentAssigneeId = item.id;
  }

  lookup(value: string): Observable<Assignee[]> {
    return this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }

  private getPossibleProjects(value: string): Observable<Project[]> {
    return this.ticketService.getPossibleProjectsByUser(value).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTicket() {
    this.ticketForm.controls.assignee.setValue(this.currentAssigneeId);
    const formValue = this.ticketForm.getRawValue();
    console.log("formValue", formValue);
    this.ngRedux.dispatch(createTicketAction(formValue as any));
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
