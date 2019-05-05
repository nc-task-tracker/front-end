import {Component, Injectable, ViewChild} from '@angular/core';
import {FilterParameter, allParameters, FilterParameterObject} from "../../models/create-filter.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent {
  filterForm : FormGroup;
  // parameters = new FormControl();
  parameterList = allParameters;

  constructor(private fb: FormBuilder,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      parameters: [],
      selectedParameter: this.fb.array([
        this.fb.control('')
      ])
    });
  }

  get selectedParameter() {
    return this.filterForm.get('selectedParameter') as FormArray;
  }

  addAlias() {
    this.selectedParameter.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.filterForm.value);
  }

  // onSelect(parameter: FilterParameterObject): void {
  //   this.selectedParameter = parameter;
  // }

}
