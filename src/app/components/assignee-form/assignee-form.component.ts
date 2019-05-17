import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Assignee} from '../../models/assignee.model';
import {Observable, of} from 'rxjs';
import {TicketService} from '../../service/ticket.service';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {select} from '@angular-redux/store';
import {selectCurrentUser, selectCurrentUserName} from '../../store/selectors/current-user.selector';
import {User} from '../../models/user.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-assignee-form',
  templateUrl: './assignee-form.component.html',
  styleUrls: ['./assignee-form.component.css']
})
export class AssigneeFormComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;

  currentAssignee: Assignee;
  currentAssigneeId: String;

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;


  public items$: Observable<Assignee[]>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  assignee: FormControl = new FormControl(null);

  constructor(
    private ticketService: TicketService
  ) {
  }

  ngOnInit() {
    this.items$ = this.assignee.valueChanges.pipe(
      filter(val => !!val),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.ticketService.getAssigneeList(value.toString()).pipe(
        catchError(_ => {
          return of(null);
        })
      ))
    );
  }


  addItem(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if (input) {
        input.value = '';
      }

      this.assignee.setValue(null);
    }
  }

  onItemSelect(event: MatAutocompleteSelectedEvent): void {
      const user = event.option.value;
      this.currentAssignee = user;
      this.assignee.setValue(user.login);
      this.currentAssigneeId = user.id;
  }

}

