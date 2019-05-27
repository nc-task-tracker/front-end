import {Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger, MatDialog} from "@angular/material";
import {fetchProjectsAction} from "../../../store/actions/Profile.action";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../../store";
import {Observable} from "rxjs";
import {selectProjects, selectProjectsIsLoading} from "../../../store/selectors/projects.selector";
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../service/project.service";
import {GlobalUserStorageService} from "../../../service/global-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectName:string;

  currentProjectId: String;
  projects$: Observable<Project[]>;

  @select(selectProjectsIsLoading)
  isLoading: Observable<boolean>;

  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  constructor(private ngRedux: NgRedux<AppState>,
              private projectService: ProjectService,
              private storageService: GlobalUserStorageService,
              private router: Router,) {
  }

  ngOnInit() {
    //this.ngRedux.dispatch(fetchProjectsAction());
/*    this.isLoading.subscribe( val => {
      console.log(val);
      if(!val) {
        this.projects = selectProjects(this.ngRedux.getState());
      }
    });*/
  }

  getAllProject() {
    this.projects$ = this.projectService.getProjectList();
  }

  chooseProject(projectId: string) {
    this.currentProjectId = projectId;
    this.router.navigate(['home']);
  }
}
