import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {Issue} from "../../models/issue.model";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute} from "@angular/router";
import {IssueService} from "../../service/issue.service";

@Component({
  selector:'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit{

  private displayedColumns: string[] = ['id','issueName', 'issueType', 'issueStatus','issuePriority','start_date','due_date','issueDescription'];
  private issues: Issue[];
  private project: Project;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private issueService: IssueService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    const id = this.route.snapshot.paramMap.get('id');

    this.projectService.getProjectById(id).subscribe(project => {
      this.project = project as Project;
    });

    this.issueService.getIssuesByProjectId(id).subscribe(issues => {
      this.issues = issues as Issue[];
    })
  }

  onClickAddIssue(): void{

  }

}
