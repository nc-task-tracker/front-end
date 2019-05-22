import {Component, OnInit, Input, ViewChild, ElementRef, InjectionToken, Inject, TemplateRef} from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';

export interface SearchByName<T> {
  searchByName(name: string): Observable<T[]>;
}

export const SEARCH_BY_NAME = new InjectionToken('SEARCH_BY_NAME');

@Component({
  selector: 'app-abstract-select-form',
  templateUrl: './abstract-select-form.component.html',
  styleUrls: ['./abstract-select-form.component.css']
})
export class AbstractSelectFormComponent<T = any> implements OnInit {

  public items$: Observable<T[]>;

  @Input()
  controlName: string;

  @Input()
  multiple = false;

  @Input()
  placeholder: string;

  @Input()
  title: string;

  @Input()
  valueTitleKey = 'name';

  @Input()
  itemValueKey: string;

  // @Input()
  // valueTitleKey: string;

  @Input()
  itemTemplate: TemplateRef<{ item: T }>;

  selectedItemsList: T[] = [];

  inputControl: FormControl = new FormControl();

  @ViewChild('nameInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private controlContainer: ControlContainer,
              @Inject(SEARCH_BY_NAME) private searchService: SearchByName<T>) { }

  ngOnInit() {
    const control = this.controlContainer.control.get(this.controlName);
    if (control) {
      this.items$ = this.inputControl.valueChanges.pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap(val => this.searchService.searchByName(this.inputControl.value))
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

  removeItem(item: T) {
    this.selectedItemsList = this.selectedItemsList.filter(it => it !== item);
    this.updateControlValue();
  }

  get control() {
    return this.controlContainer.control.get(this.controlName);
  }

  @Input()
  compareWithFunc = (o1: T, o2: T) => {
    return o1 === o2;
  }

  onItemSelect(event: MatAutocompleteSelectedEvent): void {
    if (this.multiple) {
      this.selectedItemsList.push(event.option.value);
      this.searchInput.nativeElement.value = '';
      this.inputControl.setValue(null);
      this.updateControlValue();
    } else {
      const item = event.option.value;
      const itemValue = this.itemValueKey ? item[this.itemValueKey] : item;
      this.control.setValue(itemValue);
      this.inputControl.setValue(item[this.valueTitleKey]);
    }
  }

  private updateControlValue() {
    const valueForUpdate = !this.itemValueKey ? this.selectedItemsList : this.selectedItemsList
      .map(item => item[this.itemValueKey]);
    this.control.setValue(valueForUpdate);
  }


}
