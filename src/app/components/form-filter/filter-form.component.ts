import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import {FilterItemFactory} from './factory/filter-item.factory';
import {
  allFilterTypeLabled, defaultFilter,
  FieldType,
  Filter,
  FilterItem,
  FilterType,
  InputModel, SelectFilterItem
} from "../../models/filter-item.model";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {createFilterAction, filterSearchAction, selectFilter} from "../../store/actions/filter.actions";
import {FilterService} from "../../service/filter.service";
import {allIssueType} from "../../models/issue-type.model";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {selectCurrentFilter, selectCurrentIsLoading} from "../../store/selectors/current-filter.selector";

// export const filter_default: FilterItem[] = [
//   // {
//   //   type: null,
//   //   title: null,
//   //   key: null,
//   //   placeholder: null,
//   //   value: null
//   // },
//   {
//     type: FilterType.ISSUE_TYPE,
//     fieldType: FieldType.SELECT,
//     key: FilterType.ISSUE_TYPE,
//     value: [
//       {type: "OPEN", title: "Open"},
//       {type: "CLOSED", title: "Closed"}
//     ],
//     placeholder: "Issue Status",
//     title: "Issue Status"
//
//   }
// ];
//
// export const Filter_1: Filter = {
//   id: null,
//   name: 'new filter',
//   parameters: [
//     {
//       type: FilterType.ISSUE_TYPE,
//       fieldType: FieldType.SELECT,
//       key: FilterType.ISSUE_TYPE,
//       value: [
//         {type: "OPEN", title: "Open"},
//         {type: "CLOSED", title: "Closed"}
//       ],
//       placeholder: "Issue Status",
//       title: "Issue Status"
//     }
//   ]
// }

@Component({
  selector: 'app-create-filter',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
  // template: `<p>Filter name: {{this.filter.name}}</p>
  //               <input type="text" [(ngModel)]="this.filter.name" /> <br>`
})
export class FilterFormComponent implements OnInit {

  filterForm: FormGroup;

  initialFilterItems = [...allFilterTypeLabled];

  filterItems: FilterItem[] = [];

  edit: boolean = true;

  @select(selectCurrentIsLoading)
  isLoading: Observable<boolean>;

  filterId: string;
  @ViewChild('searchItemSelect')
  searchItemSelect: MatSelect;

  @Input()
  filterName: Filter = defaultFilter;

  allFieldType = FieldType;
  filter: Filter = defaultFilter;

  constructor(private itemsFactory: FilterItemFactory,
              private ngRedux: NgRedux<AppState>,
              // private ticketService: TicketServiceService,
              private filterService: FilterService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const filterId = this.route.snapshot.params.filterId;
    this.ngRedux.dispatch(selectFilter(filterId))

    this.filterForm = this.fb.group({});
    this.generateFilterItemsByFilter();
    this.generateFormGroupFormSearchItems();

    this.isLoading.subscribe( val => {
      if(!val) {
        this.filter = selectCurrentFilter(this.ngRedux.getState());
        this.filterId = this.filter.id;
      }})
  }

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
    const formValue = this.filterForm.getRawValue();
    const parameters = this.filterItems.map(item => {
      if (item.value instanceof Array) {
        const selectItem = item as SelectFilterItem;
        const keyValue = formValue[selectItem.key] as Array<any>;
        const parameterValue = selectItem.itemValueKey ? keyValue.map(el => el[selectItem.itemValueKey]) : keyValue;
        return { ...item, type: item.type, listValue: parameterValue };
      }
      return { ...item, type: item.type, listValue: formValue[item.key] };
    });
    // console.log(parameters);
    const createFilter: Filter = {
      name: this.filterName.name,
      parameters: parameters
    };
    let validateParam = 0;
    createFilter.parameters.forEach(param => {
      if(param.value != null){
        validateParam ++;
      }
    })

    if(createFilter.parameters.length !== 0 && createFilter.parameters.length <= validateParam){
      console.log('CREATE ', createFilter);
      this.ngRedux.dispatch(createFilterAction(createFilter as any));
    }

  }

  onSearchSubmit() {
      const formValue = this.filterForm.getRawValue();
      const parameters = this.filterItems.map(item => {
      if (item.value instanceof Array) {
        const selectItem = item as SelectFilterItem;
        const keyValue = formValue[selectItem.key] as Array<any>;
        const parameterValue = selectItem.itemValueKey ? keyValue.map(el => el[selectItem.itemValueKey]) : keyValue;
        return { ...item, type: item.type, listValue: parameterValue };
      }
        return { ...item, type: item.type, listValue: formValue[item.key] };
      });

      // console.log(parameters);
      const searchFilter: Filter = {
        // name: defaultFilter.name,
        name: this.filterName.name,
        parameters: parameters
      };
      // console.log(searchFilter);
      var validateParam = 0;
      searchFilter.parameters.forEach(param => {
        // console.log(param.value);
        if(param.value != null){
          validateParam ++;
        }
      })
    console.log('param ', searchFilter.parameters.length);
      // console.log(validateParam);
      if(searchFilter.parameters.length !== 0) {
         this.ngRedux.dispatch(filterSearchAction(searchFilter));
      }
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
