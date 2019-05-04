import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from "@angular/material";
import {Ticket} from "../../models/ticket.model";
import {TicketService} from "../../service/ticket.service";
import {SortParameters} from "../../models/util/table-sort-param.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MatConfirmDialogService} from "../util/mat-confirmation-dialor/mat-confirm-dialog.service";


export class AutoUnsubscribe implements OnDestroy {

  protected streamEndSubject = new Subject();

  ngOnDestroy(): void {
    this.streamEndSubject.next();
    this.streamEndSubject.complete();
  }

}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private displayedColumns: string[] = ['id', 'issueName', 'issueType', 'issueStatus', 'issuePriority', 'startDate', 'issueDescription', 'delete'];
  private tickets: Ticket[];
  private project: Project;
  private dataSource;
  private sortParameters: SortParameters;
  private id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private ticketService: TicketService,
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

    this.projectService.getProjectById(this.id).pipe(takeUntil(this.streamEndSubject)).subscribe(project => {
      this.project = project as Project;
    });

    this.sortParameters.maxElemOnPage = 5;
    this.sortParameters.page = 0;
    this.sortParameters.columnName = "id";
    this.sortParameters.direction = "asc";

    this.ticketService.getPageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject)).subscribe(pageData => {
      this.tickets = pageData.tickets;
      this.dataSource = pageData.tickets;
      this.dataSource.sort = this.sort;
      this.paginator.length = pageData.totalElem;

      this.dataSource.paginator = this.paginator;
    });
  }

  onClickAddTicket(): void {
    this.router.navigate(['/create-ticket']);

  }

  onClickDeleteTicket(id: string): void {

    this.confirmService.openConfirmDialog("Are you sure that you want to delete this ticket?")
      .afterClosed().subscribe(repspose =>{
        if(repspose){
          this.ticketService.deleteTicket(id).subscribe();

          this.tickets = this.tickets.filter(function (value, index, arr) {
            return value.id != id;
          });
          this.dataSource = this.tickets;
          this.paginator.length--;
        }
    });

  }


  onSort(sort: Sort): void {
    this.sortParameters.columnName = sort.active;
    this.sortParameters.direction = sort.direction;
    this.sortParameters.page = this.paginator.pageIndex;
    this.sortParameters.maxElemOnPage = this.paginator.pageSize;

    console.log(this.dataSource);
    this.ticketService.getPageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
        this.dataSource = response.tickets;

        console.log(this.dataSource);
        this.cd.detectChanges();
      });
  }

  getPageData(event: PageEvent) {

    this.sortParameters.page = event.pageIndex;

    this.ticketService.getPageData(this.id, this.sortParameters).pipe(takeUntil(this.streamEndSubject))
      .subscribe(response => {
        console.log(response);
        this.dataSource = response.tickets;
        this.tickets = response.tickets;
      });
  }
}
