import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project.model";
import {Issue} from "../../models/issue.model";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute} from "@angular/router";
import {IssueService} from "../../service/issue.service";
import {MatPaginator, MatSort, MatTableDataSource, Sort} from "@angular/material";
import {SortParameters} from "../../models/tableSort/sortParameters.model";

@Component({
  selector:'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit{

  private displayedColumns: string[] = ['id','issueName', 'issueType', 'issueStatus','issuePriority','startDate','dueDate','issueDescription'];
  private issues: Issue[];
  private project: Project;
  private dataSource;
  private sortParameters: SortParameters;
  private id: string;

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private issueService: IssueService) {

    this.sortParameters = new SortParameters();
  }


  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.id = this.route.snapshot.paramMap.get('id');

    this.projectService.getProjectById(this.id).subscribe(project => {
      this.project = project as Project;
    });

    this.issueService.getIssuesByProjectId(this.id).subscribe(issues => {
      this.issues = issues as Issue[];

      this.dataSource = new MatTableDataSource(this.issues);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onClickAddIssue(): void{

  }


  onSort(sort: Sort): void{
    this.sortParameters.columnName = sort.active;
    this.sortParameters.direction = sort.direction;
    this.sortParameters.page = this.paginator.pageIndex;
    this.sortParameters.maxElemOnPage = this.paginator.pageSize;

    this.issueService.getSortedIssues(this.id, this.sortParameters).subscribe(sortedIssues =>{
      this.dataSource = sortedIssues;
      this.issues = sortedIssues;
    })
  }
}
