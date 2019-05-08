import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {allTicketPriority, TicketPriority, TicketPriorityLabel, allTicketTypes} from '../../models/ticket.model';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {createTicketAction, getAssigneeList} from '../../store/actions/create-ticket.actions';
import {Observable, of} from 'rxjs';
import {TicketService} from '../../service/ticket.service';
import {Assignee} from '../../models/assignee.model';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {GlobalUserStorageService} from '../../service/global-storage.service';
import {Router} from '@angular/router';
import {selectCurrentUser, selectCurrentUserName} from '../../store/selectors/current-user.selector';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-create-ticket-page',
  templateUrl: './create-ticket-page.component.html',
  styleUrls: ['./create-ticket-page.component.css']
})
export class CreateTicketPageComponent implements OnInit, AfterViewInit {



  minDate = new Date();
  ticketForm: FormGroup;
  allTicketPriority = allTicketPriority;
  allTicketTypes = allTicketTypes;
  private assignees;
  public autoCompleteControl = new FormControl();
  public assigneeAutoComplete$: Observable<Assignee[]> = null;
  choosenAssignee = [];

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;


  constructor(private fb: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private ticketService: TicketService,
              private storageService: GlobalUserStorageService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.ticketForm = this.fb.group({
      minDate: new Date(),
      issueName: [''],
      issueType: [''],
      issuePriority: [''],
      issueDescription: [''],
      assignee: []
    });
  }

  createTicket() {
    const formValue = this.ticketForm.getRawValue();
    this.ngRedux.dispatch(createTicketAction(formValue as any));
  }

  onCancelClick() {
    this.router.navigate(['']);     //todo: Project page
  }

  private initializeForm() {
    this.ticketForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      projectCode: ['', Validators.required],
      ownerId: this.storageService.currentUser.id
    });
  }

  ngAfterViewInit() {
   this.assignees = this.assigneeAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      debounceTime(2000),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    );
  }

  private chooseAssignee(item) {
    this.choosenAssignee = item.login;
    const input = document.getElementById('assigneeInput');
    this.assignees = null;
  }

  private lookup(value: string): Observable<Assignee[]> {
    return this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }


}
