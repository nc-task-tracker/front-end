import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";
import {Observable} from "rxjs";
import {Dashboard} from "../../../models/dashboard.model";
import {Router} from "@angular/router";
import {DashboardService} from "../../../service/dashboard.service";
import {GlobalUserStorageService} from "../../../service/global-storage.service";


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  dashboards$: Observable<Dashboard[]>;

  constructor(private router: Router,
              private dashboardService : DashboardService,
              private storageService: GlobalUserStorageService) {
    
  }

  ngOnInit() {
  }

  getAllDashboard() {
    this.dashboards$ = this.dashboardService.getDashboardList(this.storageService.currentUser.id);
  }

  chooseDashboard(idDashboard: string) {
    this.router.navigate(['dashboard', idDashboard]);
  }
}
