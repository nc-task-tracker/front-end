import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import {FilterItemFactory} from './factory/filter-item.factory';
import {
  allFilterTypeLabled,
  FieldType,
  Filter,
  FilterItem,
  FilterType,
  InputModel
} from "../../models/filter-item.model";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {createFilterAction} from "../../store/actions/filter.actions";
import {FilterService} from "../../service/filter.service";
import {allIssueType} from "../../models/issue-type.model";

export const filter_default: FilterItem[] = [
  // {
  //   type: null,
  //   title: null,
  //   key: null,
  //   placeholder: null,
  //   value: null
  // },
  {
    type: FilterType.ISSUE_TYPE,
    fieldType: FieldType.SELECT,
    key: FilterType.ISSUE_TYPE,
    value: [
      {type: "OPEN", title: "Open"},
      {type: "CLOSED", title: "Closed"}
    ],
    placeholder: "Issue Status",
    title: "Issue Status"

  }
];

export const Filter_1: Filter = {
  id: null,
  name: 'new filter',
  parameters: [
    {
      type: FilterType.ISSUE_TYPE,
      fieldType: FieldType.SELECT,
      key: FilterType.ISSUE_TYPE,
      value: [
        {type: "OPEN", title: "Open"},
        {type: "CLOSED", title: "Closed"}
      ],
      placeholder: "Issue Status",
      title: "Issue Status"
    }
  ]
}

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit {

  filterForm: FormGroup;

  initialFilterItems = [...allFilterTypeLabled];

  // filterItems: FilterItem[] = [];
  filterItems: FilterItem[] = [];
  // filterItems: FilterItem[] = filter_default;


  @ViewChild('searchItemSelect')
  searchItemSelect: MatSelect;

  // @select(filter_default)
  //   isLoading : Observable<boolean>;

  allFieldType = FieldType;
  filter: Filter = {
      parameters: [
        {
          type: FilterType.ISSUE_TYPE,
          value: [...allIssueType]
        }
      ]
  };


  constructor(private itemsFactory: FilterItemFactory,
              private ngRedux: NgRedux<AppState>,
              // private ticketService: TicketServiceService,
              private filterService: FilterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.filterForm = this.fb.group({filter_default});
    this.filterForm = this.fb.group({});
    this.generateFilterItemsByFilter();
    this.generateFormGroupFormSearchItems();

  }

  // formInit() {
  //   this.filterForm = this.fb.group({})
  // }

  onItemAdd(event: MatSelectChange) {
    this.searchItemSelect.close();
    this.searchItemSelect.value = [];
    const model = event.value[0];
    this.addFilterItem(model);
  }

  private addFilterItem(model: InputModel) {
    const newItem = this.itemsFactory.createItem({type: model.type, key: model.key, value: model.value});
    if (newItem) {
      const itemIndex = this.initialFilterItems.findIndex(el => el.type === model.type);
      if (itemIndex >= 0) {
        const element = this.initialFilterItems[itemIndex];
        this.initialFilterItems.splice(itemIndex, 1, {...element, hidden: true});
      }
      this.addControlToForm(newItem);
      this.filterItems.push(newItem);
      console.log("new item", newItem);
    }
  }

  generateFilterItemsByFilter() {
    this.filter.parameters.map(param => {
      const filterLabel = allFilterTypeLabled.find(el => el.type == param.type);
      if (filterLabel) {
          return {type: param.type, key: filterLabel.key, value: param.value};
      } else {
          return null;
      }
    }).filter(el => el).forEach(item => this.addFilterItem(item));
  }

  removeFilterItem(item: FilterItem) {
    this.filterForm.removeControl(item.key);
    this.filterItems = this.filterItems.filter(el => el !== item);
    const itemIndex = this.initialFilterItems.findIndex(el => el.type === item.type);
    if (itemIndex >= 0) {
      const element = this.initialFilterItems[itemIndex];
      this.initialFilterItems.splice(itemIndex, 1, {...element, hidden: false});
    }
  }

  createFilter() {
    console.log(this.filterForm.getRawValue());
    const formValue = this.filterForm.getRawValue();
    const parameters = this.filterItems.map(item => {
      return {...item, key: formValue[item.key], value: formValue[item.value]};
      // return {value: String(formValue[item.value])};
    });
    console.log(parameters);
    const createFilter: Filter = {
      name: Filter_1.name,
      parameters: parameters
    };
    console.log(createFilter);
    this.ngRedux.dispatch(createFilterAction(createFilter));
  }

  onSearchSubmit() {
    console.log(this.filterForm.getRawValue());
    const formValue = this.filterForm.getRawValue();
    const parameters = this.filterItems.map(item => {
      return {...item, key: formValue[item.key], value: formValue[item.value]};
    });
    const searchFilterItems: Filter = {
      parameters: parameters
    };
    console.log(searchFilterItems);
    // this.ticketService.searchByFilter(searchFilterItems);
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
