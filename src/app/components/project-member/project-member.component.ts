import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {ProjectMember} from "../../models/project-member.model";
import {ProjectMemberService} from "../../service/project-member.service";
import {takeUntil} from "rxjs/operators";
import {MatConfirmDialogService} from "../util/mat-confirmation-dialor/mat-confirm-dialog.service";
import {Project} from "../../models/project.model";
import {ProjectMemberModalComponent} from "../project-member-modal/project-member-modal.component";

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private id: string;
  private dataSource;
  private members: ProjectMember[];
  private displayedColumns: string[] = ['Name', 'Role', 'Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private projectMemberService: ProjectMemberService,
              private projectService: ProjectService,
              private confirmService: MatConfirmDialogService,
              private matDialog: MatDialog,) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.getData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }


  getData(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.projectService.getProjectById(this.id).subscribe(response => {
      this.members = response.members as ProjectMember[];
      this.dataSource = this.members;
    });
  }

  deleteMember(member: ProjectMember): void {
    this.confirmService.openConfirmDialog("Are you sure?")
      .afterClosed().pipe(takeUntil(this.streamEndSubject)).subscribe(response => {
      if (response) {
        this.projectMemberService.deleteMember(this.id, member.id).subscribe();

        this.members = this.members.filter(function (value, index, arr) {
          return value.id != member.id;
        });

        this.dataSource = this.members;
      }
    })
  }


  //
  // addAssigner(user: User): void {
  //   this.confirmService.openConfirmDialog("Are you sure that this user become a assigner?")
  //     .afterClosed().pipe(
  //     takeUntil(this.streamEndSubject),
  //     filter(response => response),
  //     switchMap(() => this.projectService.addAssigner(this.id, user))
  //   ).subscribe(() => {
  //     this.project.assigners.push(user);
  //     this.noAssigners = this.noAssigners.filter(function (value, arr, index) {
  //       return value.id != user.id;
  //     })
  //   })

  onClickAddMember(): void {
    this.matDialog.open(ProjectMemberModalComponent);
  }

}
