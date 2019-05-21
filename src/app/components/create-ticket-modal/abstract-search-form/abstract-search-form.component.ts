import {Component, ElementRef, Inject, InjectionToken, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ControlContainer, FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {Assignee} from '../../../models/assignee.model';

export interface SearchByString<T> {
  searchByString(name: string): Observable<T[]>;
}

export const SEARCH_BY_STRING = new InjectionToken('SEARCH_BY_STRING');


@Component({
  selector: 'app-abstaract-search-form',
  templateUrl: './abstract-search-form.component.html',
  styleUrls: ['./abstract-search-form.component.css']
})
export class AbstractSearchFormComponent<T = any> implements OnInit {

  public items$: Observable<T[]>;

  @Input()
  controlName: string;

  @Input()
  placeholder: string;

  inputControl: FormControl = new FormControl();

  @ViewChild('assigneeInput') assigneeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private controlContainer: ControlContainer,
              @Inject(SEARCH_BY_STRING) private searchService: SearchByString<T>) {
  }

  ngOnInit() {
    if (this.control) {
      this.items$ = this.inputControl.valueChanges.pipe(
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(val => this.searchService.searchByString(this.inputControl.value))
      );
    }
  }

  get control() {
    return this.controlContainer.control.get(this.controlName);
  }

  onItemSelect(event: MatAutocompleteSelectedEvent): void {
    const item = event.option.value;
    this.control.setValue(item.id);
    this.inputControl.setValue(item.login);
  }

}
