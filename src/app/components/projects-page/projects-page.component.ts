import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../models/project.model";
import {takeUntil} from "rxjs/operators";
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from "@angular/material";
import {SortParameters} from "../../models/util/table-sort-param.model";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private projects: Project[];
  private dataSource;
  private sortParameters: SortParameters;
  private displayedColumns: string[] = ['projectName', 'projectCode', 'projectStatus', 'projectDescription', 'projectOwner'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService: ProjectService,
              private router: Router,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.sortParameters = new SortParameters();
    this.dataSource = new MatTableDataSource();

    this.getData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getData(): void {
    const pageEvent = new PageEvent();

    this.sortParameters.maxElemOnPage = 5;
    this.sortParameters.page = 0;
    this.sortParameters.columnName = "projectName";
    this.sortParameters.direction = "asc";

    this.projectService.getTablePageData(this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
          this.projects = response.list;
          this.dataSource = response.list;
          this.dataSource.sort = this.sort;
          this.paginator.length = response.totalElem;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
        }
      );
  }

  onSort(sort: Sort): void {
    this.sortParameters.direction = sort.direction;
    this.sortParameters.columnName = sort.active;
    this.sortParameters.page = this.paginator.pageIndex;
    this.sortParameters.maxElemOnPage = this.paginator.pageSize;

    this.projectService.getTablePageData(this.sortParameters).subscribe(response => {
      this.projects = response.list;
      this.dataSource = response.list;

      this.cd.detectChanges();
    });
  }

  getPageData(event: PageEvent) {

    this.sortParameters.page = event.pageIndex;
    this.sortParameters.maxElemOnPage = event.pageSize;

    this.projectService.getTablePageData(this.sortParameters).subscribe(response => {
      this.projects = response.list;
      this.dataSource = response.list;
    });
  }

  public doFilter = (filterValue: string) => {
    console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  };


  onSelectProject(project: Project): void {
    this.router.navigate([`/project/${project.id}`]);
  }
}
