import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from "@angular/material";
import {Ticket} from "../../models/ticket.model";
import {TicketService} from "../../service/ticket.service";
import {SortParameters} from "../../models/util/table-sort-param.model";
import {filter, switchMap, takeUntil} from "rxjs/operators";
import {MatConfirmDialogService} from "../util/mat-confirmation-dialor/mat-confirm-dialog.service";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {User} from "../../models/user.model";
import {UserService} from "../../service/user.service";
import {select} from "@angular-redux/store";
import {selectCurrentUserName} from "../../store/selectors/current-user.selector";
import {Observable} from "rxjs";


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private displayedColumns: string[] = ['issueName', 'issueType', 'issueStatus', 'issuePriority', 'startDate', 'issueDescription', 'delete'];
  private tickets: Ticket[];
  private project: Project;
  private dataSource;
  private sortParameters: SortParameters;
  private id: string;
  private noAssigners: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private ticketService: TicketService,
              private userService: UserService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private confirmService: MatConfirmDialogService) {
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
    this.id = this.route.snapshot.paramMap.get('id');

    this.projectService.getProjectById(this.id).pipe(takeUntil(this.streamEndSubject))
      .subscribe(project => {
        this.project = project as Project;
      });

    this.sortParameters.maxElemOnPage = 5;
    this.sortParameters.page = 0;
    this.sortParameters.columnName = "id";
    this.sortParameters.direction = "asc";

    this.ticketService.getTablePageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(pageData => {
        this.tickets = pageData.list;
        this.dataSource = pageData.list;
        this.dataSource.sort = this.sort;
        this.paginator.length = pageData.totalElem;
        this.dataSource.paginator = this.paginator;
      });

    this.userService.getNotProjectAssigners(this.id).subscribe(value => {
      this.noAssigners = value as User[];
    });

  }

  onClickAddTicket(): void {
    this.router.navigate(['/create-ticket']);

  }

  onClickDeleteTicket(id: string): void {

    this.confirmService.openConfirmDialog("Are you sure that you want to delete this ticket?")
      .afterClosed().pipe(takeUntil(this.streamEndSubject)).subscribe(repsponse => {
      if (repsponse) {

        this.ticketService.deleteTicket(id).subscribe();

        this.tickets = this.tickets.filter(function (value, index, arr) {
          return value.id != id;
        });
        this.dataSource = this.tickets;
        this.paginator.length--;

        if (this.tickets.length == 0)
          this.paginator.previousPage();
      }
    });

  }

  onSort(sort: Sort): void {
    this.sortParameters.columnName = sort.active;
    this.sortParameters.direction = sort.direction;
    this.sortParameters.page = this.paginator.pageIndex;
    this.sortParameters.maxElemOnPage = this.paginator.pageSize;

    this.ticketService.getTablePageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
        this.dataSource = response.list;
        this.tickets = response.list;

        this.cd.detectChanges();
      });
  }

  getPageData(event: PageEvent) {
    this.sortParameters.page = event.pageIndex;
    this.sortParameters.maxElemOnPage = event.pageSize;

    this.ticketService.getTablePageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
        this.dataSource = response.list;
        this.tickets = response.list;
      });
  }

  deleteAssigner(assigner: User): void {
    this.confirmService.openConfirmDialog("Are you sure that you want to delete assigner?")
      .afterClosed().pipe(takeUntil(this.streamEndSubject)).subscribe(response => {
      if (response) {
        this.projectService.deleteAssigner(this.id, assigner.id).subscribe();

        this.project.assigners = this.project.assigners.filter(function (value, arr, index) {
          return value.id != assigner.id;
        });
        this.noAssigners.push(assigner);
      }
    })
  }

  addAssigner(user: User): void {
    this.confirmService.openConfirmDialog("Are you sure that this user become a assigner?")
      .afterClosed().pipe(
      takeUntil(this.streamEndSubject),
      filter(response => response),
      switchMap(() => this.projectService.addAssigner(this.id, user))
    ).subscribe(() => {
      this.project.assigners.push(user);
      this.noAssigners = this.noAssigners.filter(function (value, arr, index) {
        return value.id != user.id;
      })
    })
  }
}
