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
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  private possibleProjects;
  private minDate = new Date();
  private ticketForm: FormGroup;
  private ticketPriority = allTicketPriority;
  private ticketTypes = allTicketTypes;

  public nameControl = new FormControl();
  public autoCompleteControl = new FormControl();
  public assigneeAutoComplete$: Observable<Assignee[]> = null;
  private currentAssignee = this.userName;

  private assignees = this.assigneeAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
    startWith(''),
    debounceTime(2000),
    distinctUntilChanged(),
    switchMap(value => {
      if (value !== '') {
        return this.lookup(value);
      } else {
        return of(null);
      }
    })
  );


  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<AppState>,
    private router: Router,
    private storageService: GlobalUserStorageService,
    public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {
    this.currentAssignee = this.userName;
  }

  ngOnInit() {
    this.getPossibleProjects(this.userName.toString()).subscribe(res => this.possibleProjects = res);

    console.log(this.possibleProjects);
    this.ticketForm = this.fb.group({
      issueName: new FormControl(),
      issueDescription: [''],
      dueDate: [''],
      project: [''],
      issueType: [''],
      issuePriority: [''],
      parentId: [''],
      assignee: [''],
      reporter: [''],
      minDate: new Date()

    });

  }


  onCancelClick() {
    this.dialogRef.close();

  }

  chooseAssignee(item) {
    this.currentAssignee = item;
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
    const formValue = this.ticketForm.getRawValue();
    console.log(formValue);
    this.ngRedux.dispatch(createTicketAction(formValue as any));
  }

  generateCode() {

  }
}
