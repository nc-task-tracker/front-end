import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CreateTicketModalComponent} from "../create-ticket-modal/create-ticket-modal.component";
import {SearchModalComponent} from "../search-modal/search-modal.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Dashboard} from "../../models/dashboard.model";
import {DashboardService} from "../../service/dashboard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private id: string;
  private dashboard: Observable<Dashboard>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private matDialog: MatDialog,
              public dialogRef: MatDialogRef<SearchModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dashboard = this.dashboardService.getDashboard(this.id);
  }

  createSearchClick() {

  }

  createProjectClick() {

  }

  selectFilterClick() {
     this.matDialog.open(SearchModalComponent);
  }
}
