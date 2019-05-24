import {Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger, MatDialog} from "@angular/material";
import {fetchProjectsAction} from "../../../store/actions/Profile.action";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../../store";
import {Observable} from "rxjs";
import {selectProjects, selectProjectsIsLoading} from "../../../store/selectors/projects.selector";
import {Project} from "../../../models/project.model";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectName:string;

  projects: Project[];

  @select(selectProjectsIsLoading)
  isLoading: Observable<boolean>;

  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.ngRedux.dispatch(fetchProjectsAction());
    this.isLoading.subscribe( val => {
      console.log(val);
      if(!val) {
        this.projects = selectProjects(this.ngRedux.getState());
      }
    });
  }
}
