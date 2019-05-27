import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DashboardService} from "../../../service/dashboard.service";
import {GlobalUserStorageService} from "../../../service/global-storage.service";
import {Observable} from "rxjs";
import {Filter} from "../../../models/filter-item.model";
import {FilterService} from "../../../service/filter.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters$: Observable<Filter[]>;

  constructor(private router: Router,
              private filterService : FilterService) {}

  ngOnInit() {
  }

  getAllFilters() {
    this.filters$ = this.filterService.getFilterList();
  }
}
