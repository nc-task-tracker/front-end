import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, Sort} from "@angular/material";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {ProjectMember} from "../../models/project-member.model";
import {ProjectMemberService} from "../../service/project-member.service";
import {takeUntil} from "rxjs/operators";
import {MatConfirmDialogService} from "../util/mat-confirmation-dialor/mat-confirm-dialog.service";
import {ProjectMemberModalComponent} from "../project-member-modal/project-member-modal.component";
import {ProjectRole} from "../../models/Enums/project-role.enum";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {SortParameters} from "../../models/util/table-sort-param.model";

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private id: string;
  private dataSource;
  private members: ProjectMember[];
  private pageMembers: ProjectMember[];
  private displayedColumns;
  private displayedColumnsWithDev: string[] = ['profile.user.login', 'Role'];
  private displayedColumnsWithoutDev: string[] = ['profile.user.login', 'Role', 'Delete'];
  private buttonVisibility: boolean;
  private user: ProjectMember;
  private ownerId: string;
  private sortParameters: SortParameters;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private projectMemberService: ProjectMemberService,
              private projectService: ProjectService,
              private confirmService: MatConfirmDialogService,
              private matDialog: MatDialog,
              private storageService: GlobalUserStorageService,
              private cd: ChangeDetectorRef,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.sortParameters = new SortParameters();
    this.buttonVisibility = false;

    this.getData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }


  getData(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    var userId = this.storageService.currentUser.id;

    this.sortParameters.maxElemOnPage = 5;
    this.sortParameters.page = 0;
    this.sortParameters.columnName = "id";
    this.sortParameters.direction = "asc";

    this.projectService.getProjectById(this.id).subscribe(response => {
      this.members = response.members as ProjectMember[];

      this.user = response.members.find((value,index,array) =>{
        return userId === value.profile.user.id;
      });

      this.chooseColumns();

      this.ownerId = response.members.find((value,index,array) =>{
        return value.role === ProjectRole.OWNER;
      }).profile.user.id;

      if(this.user.role === ProjectRole.DEVELOPER)
        this.buttonVisibility = false;
      else this.buttonVisibility = true;
    });

    this.projectMemberService.getTablePageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(pageData => {
        this.pageMembers = pageData.list;
        this.dataSource = pageData.list;
        this.dataSource.sort = this.sort;
        this.paginator.length = pageData.totalElem;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteMember(member: ProjectMember): void {

    if(member.profile.user.id === this.ownerId || member.profile.user.id === this.user.profile.user.id)
        return;

    this.confirmService.openConfirmDialog("Are you sure?")
      .afterClosed().pipe(takeUntil(this.streamEndSubject)).subscribe(response => {
      if (response) {
        this.projectMemberService.deleteMember(this.id, member.id).subscribe();

        this.pageMembers = this.pageMembers.filter(function (value, index, arr) {
          return value.id != member.id;
        });

        this.dataSource = this.pageMembers;
      }
    })
  }

  onSort(event: Sort): void{
    this.sortParameters.columnName = event.active;
    this.sortParameters.direction = event.direction;
    this.sortParameters.page = this.paginator.pageIndex;
    this.sortParameters.maxElemOnPage = this.paginator.pageSize;

    this.projectMemberService.getTablePageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
        this.dataSource = response.list;
        this.pageMembers = response.list;

        this.cd.detectChanges();
      });
  }

  onClickAddMember(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.id;

    this.matDialog.open(ProjectMemberModalComponent,dialogConfig);
  }

  isDeveloper(): boolean{
    return this.user.role === ProjectRole.DEVELOPER;
  }

  chooseColumns(): void{
    if(this.isDeveloper())
      this.displayedColumns = this.displayedColumnsWithDev;
    else this.displayedColumns = this.displayedColumnsWithoutDev;
  }

  onClickProjectMember(member: ProjectMember): void{
    this.router.navigate([`/profile/${member.profile.user.id}`]);
  }
}
