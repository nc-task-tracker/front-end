import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {allTicketPriority} from '../../models/ticket.model';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {createTicketAction, getAssigneeList} from '../../store/actions/tickets.actions';
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

  ticketForm: FormGroup;
  private assignees;
  public autoCompleteControl = new FormControl();
  public assigneeAutoComplete$: Observable<Assignee[]> = null;
  chosenAssignee = [];



  constructor(private fb: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private ticketService: TicketService,
              private storageService: GlobalUserStorageService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.ticketForm = this.fb.group({
      issueName: [''],
      issueDescription: [''],
      dueDate: [''],
      project: [''],
      issueType: [''],
      issuePriority: [''],
      issueStatus: [''], // TODO: не передаем, а генерим на беке стандартный статус для всех новых ишью
      childissue: [''],
      issues: [''],
      issueRoles: [''],
      assignee: [''],
      reporter: [''],
      minDate: new Date()

    });
  }

  createTicket() {
    const formValue = this.ticketForm.getRawValue();
    this.ngRedux.dispatch(createTicketAction(formValue as any));
  }

  onCancelClick() {
    this.router.navigate(['']);     // todo: Project page
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
    this.chosenAssignee = item.login;
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
