import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {ProjectMember} from "../../models/project-member.model";
import {ProjectMemberService} from "../../service/project-member.service";
import {takeUntil} from "rxjs/operators";
import {MatConfirmDialogService} from "../util/mat-confirmation-dialor/mat-confirm-dialog.service";
import {ProjectMemberModalComponent} from "../project-member-modal/project-member-modal.component";
import {select} from "@angular-redux/store";
import {selectCurrentUser} from "../../store/selectors/current-user.selector";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {ProjectRole} from "../../models/Enums/project-role.enum";

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
  private buttonVisibility: boolean;
  private user: ProjectMember;
  private ownerId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private route: ActivatedRoute,
              private projectMemberService: ProjectMemberService,
              private projectService: ProjectService,
              private confirmService: MatConfirmDialogService,
              private matDialog: MatDialog,) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.buttonVisibility = false;

    this.getData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }


  getData(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    var userId = null;

    this.currentUser.subscribe((ref) => {
      userId = ref.id;
    });

    this.projectService.getProjectById(this.id).subscribe(response => {
      this.members = response.members as ProjectMember[];
      this.dataSource = this.members;
      this.ownerId = response.projectOwner.id;

      this.user = response.members.find((value,index,array) =>{
        return userId === value.profile.user.id;
      });

      if(this.user.role === ProjectRole.DEVELOPER)
        this.buttonVisibility = false;
      else this.buttonVisibility = true;
    });
  }

  deleteMember(member: ProjectMember): void {

    if(member.profile.user.id === this.ownerId)
      if(this.user.role!= ProjectRole.OWNER)
        return;

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

  onClickAddMember(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.id;

    this.matDialog.open(ProjectMemberModalComponent,dialogConfig);
  }

}
