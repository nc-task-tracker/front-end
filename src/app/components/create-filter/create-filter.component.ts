import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material';
import { FilterItemFactory } from './factory/filter-item.factory';
import {allFilterTypeLabled, FieldType, Filter, FilterItem} from "../../models/filter-item.model";
import {debounceTime, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {createFilterAction} from "../../store/actions/filter.actions";
import {TicketServiceService} from "../../service/ticket-service.service";

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit{

  filterForm: FormGroup;

  initialFilterItems = [...allFilterTypeLabled];
  filterItems: FilterItem[] = [];


  @ViewChild('searchItemSelect')
  searchItemSelect: MatSelect;

  allFieldType = FieldType;

  constructor(private itemsFactory: FilterItemFactory,
              private ngRedux: NgRedux<AppState>,
              private ticketService: TicketServiceService){ }

  ngOnInit() {
    this.filterForm = new FormGroup({});
    this.generateFormGroupFormSearchItems();
  }

  onItemAdd(event: MatSelectChange) {
    this.searchItemSelect.close();
    this.searchItemSelect.value = [];
    const model = event.value[0];
    const newItem = this.itemsFactory.createItem({ type: model.type, key: model.key });
    if (newItem) {
      const itemIndex = this.initialFilterItems.findIndex(el => el.type === model.type);
      if (itemIndex >= 0) {
        const element = this.initialFilterItems[itemIndex];
        this.initialFilterItems.splice(itemIndex, 1, { ...element, hidden: true });
      }
      this.addControlToForm(newItem);
      this.filterItems.push(newItem);
      console.log("new item", newItem);
    }

  }

  removeFilterItem(item: FilterItem) {
    this.filterForm.removeControl(item.key);
    this.filterItems = this.filterItems.filter(el => el !== item);
    const itemIndex = this.initialFilterItems.findIndex(el => el.type === item.type);
    if (itemIndex >= 0) {
      const element = this.initialFilterItems[itemIndex];
      this.initialFilterItems.splice(itemIndex, 1, { ...element, hidden: false });
    }
  }

  createFilter() {
    console.log(this.filterForm.getRawValue());
    const formValue = this.filterForm.getRawValue();
    this.ngRedux.dispatch(createFilterAction(formValue));
  }

  onSearchSubmit() {
    // const searchFilterItems = new Set<FilterItem>();
    // this.filterItems.forEach(item => this.searchItemSelect.add(item))
    const searchFilterItems: Filter = {
        parametervalues: this.filterItems
    };
    console.log(this.filterForm.getRawValue());
    const formValue = this.filterForm.getRawValue();
    // this.ticketService.searchByFilter(this.searchItemSelect)
    // this.ngRedux.dispatch(searchFilterAction(formValue));
  }

  private generateFormGroupFormSearchItems() {
    console.log("poi");
    this.filterItems.forEach(item => this.addControlToForm(item));
  }

  private addControlToForm(item: FilterItem) {
    if (item) {
      console.log("item", item);
      this.filterForm.addControl(item.key, new FormControl(item.value))
    }
  }
}
