import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-assignee-form',
  templateUrl: './assignee-form.component.html',
  styleUrls: ['./assignee-form.component.css']
})
export class AssigneeFormComponent implements OnInit {

  public items$: Observable<User[]>;

  @Input()
  controlName: string;

  @Input()
  multiple = false;

  @Input()
  placeholder: string;

  @Input()
  title: string;

  selectedUserList: User[] = [];

  inputControl: FormControl = new FormControl();

  @ViewChild('assigneeInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private controlContainer: ControlContainer,
              private userService: UserService) { }

  ngOnInit() {
    const control = this.controlContainer.control.get(this.controlName);
    if (control) {
      this.items$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap(val => this.userService.getUsers())
      );
    }
  }

  addItem(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // this.selectedUserList.push(value);

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.inputControl.setValue(null);
    }
  }

  removeItem(item: User) {
    this.selectedUserList = this.selectedUserList.filter(user => user !== item);
    this.control.setValue(this.selectedUserList);
  }

  get control() {
    return this.controlContainer.control.get(this.controlName);
  }

  compareWithFunc(o1: User, o2: User) {
    return o1.id === o2.id;
  }

  onItemSelect(event: MatAutocompleteSelectedEvent): void {
    if (this.multiple) {
      this.selectedUserList.push(event.option.value);
      this.control.setValue(this.selectedUserList);
      this.searchInput.nativeElement.value = '';
      this.inputControl.setValue(null);
    } else {
      const user = event.option.value;
      this.control.setValue(user);
      this.inputControl.setValue(user.name);
    }
  }

}
