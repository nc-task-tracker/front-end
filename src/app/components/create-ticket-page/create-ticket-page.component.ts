import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {allTicketPriority, TicketPriority, TicketPriorityLabel, allTicketTypes} from '../../models/ticket.model';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import {createTicketAction, getAssigneeList} from '../../store/actions/tickets.actions';
import {Observable, of} from 'rxjs';
import {TicketService} from '../../service/ticket.service';
import {Assignee} from '../../models/assignee.model';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';


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


  constructor(private fb: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketForm = this.fb.group({
      minDate: new Date(),
      issueName: [''],
      issueType: [''],
      priority: [TicketPriority.MINOR],
      issueDescription: [''],
      assignee: []
    });
  }

  createTicket() {
    console.log('HELLO');

    const formValue = this.ticketForm.getRawValue();
    console.log(formValue);
    this.ngRedux.dispatch(createTicketAction(formValue));
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
    // const input = document.getElementById('example');
    // const example = Observable
    //   .fromEvent(input, 'keyup')
    //   .map(i => (i.currentTarget as HTMLInputElement).value);
    //
    // const debouncedInput = example.debounceTime(2000);
    // debouncedInput.subscribe(val => {
    //  console.log(val);
    //  this.assignees = this.ticketService.getAssigneeList(val);
    // this.createDropdownList();
    // });
  }

  private chooseAssignee(item) {
    console.log(item);
    const dropdown = document.getElementsByClassName('listAssignee');

  }

  private lookup(value: string): Observable<Assignee[]> {
    return this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
      catchError(_ => {
        return of(null);
      })
    );
  }




  private createDropdownList() {
  }

}
