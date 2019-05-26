// import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {Ticket} from "../../../models/ticket.model";
// import {AutoUnsubscribe} from "../../../service/auto-unsubscribe";
// import {TicketService} from "../../../service/ticket.service";
// import {Router} from "@angular/router";
// import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from "@angular/material";
// import {SortParameters} from "../../../models/util/table-sort-param.model";
// import {takeUntil} from "rxjs/operators";
// import {selectCurrentFilter, selectCurrentIsLoading} from "../../../store/selectors/current-filter.selector";
// import {NgRedux, select} from "@angular-redux/store";
// import {Observable} from "rxjs";
// import {selectIsLoading, selectTickets} from "../../../store/selectors/tickets.selector";
// import {AppState} from "../../../store";
//
// @Component({
//   selector: 'app-tickets-page',
//   templateUrl: './tickets-page.component.html',
//   styleUrls: ['./tickets-page.component.css']
// })
// export class TicketsPageComponent extends AutoUnsubscribe implements OnInit, OnDestroy {
//
//   private tickets: Ticket[];
//   private dataSource;
//   private sortParameters: SortParameters;
//   private selectedTicket: Ticket;
//
//   private resultTickets: Map<string, Ticket>;
//
//   private displayedColumns: string[] = [
//     'ticketName',
//     'ticketType',
//     'ticketStatus',
//     'ticketPriority',
//     'assignee',
//     'reporter',
//     'project',
//     'parentId',
//     'dueDate',
//     'startDate',
//     'ticketDescription'
//   ]
//
//   @select(selectIsLoading)
//   isLoading: Observable<boolean>;
//
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
//
//   constructor(private ticketService: TicketService,
//               private router: Router,
//               private  cd: ChangeDetectorRef,
//               private ngRedux: NgRedux<AppState>,) {
//     super();
//   }
//
//   ngOnInit(): void {
//     this.sortParameters = new SortParameters();
//     this.dataSource = new MatTableDataSource();
//
//     this.isLoading.subscribe( val => {
//       if(!val) {
//         this.resultTickets = selectTickets(this.ngRedux.getState());
//       }})
//
//     // this.resultTickets.subscribe()
//     this.getData();
//   }
//
//   ngOnDestroy(): void {
//     super.ngOnDestroy();
//   }
//
//   getData(): void {
//     const pageEvent = new PageEvent();
//
//     this.sortParameters.maxElemOnPage = 5;
//     this.sortParameters.page = 0;
//     this.sortParameters.columnName = "ticketName";
//     this.sortParameters.direction = "asc";
//
//     //
//     // this.ticketService.getTablePageData(this.sortParameters).pipe(takeUntil(this.streamEndSubject))
//     //   .subscribe(response => {
//     //       this.tickets = response.list;
//     //       this.dataSource = response.list;
//     //       this.dataSource.sort = this.sort;
//     //       this.paginator.length = response.totalElem;
//     //       this.dataSource.paginator = this.paginator;
//     //     }
//     //   );
//   }
//
//   // onSort(sort: Sort): void{
//   //   this.sortParameters.direction = sort.direction;
//   //   this.sortParameters.columnName = sort.active;
//   //   this.sortParameters.page = this.paginator.pageIndex;
//   //   this.sortParameters.maxElemOnPage = this.paginator.pageSize;
//   //
//   //   this.ticketService.getTablePageData(this.sortParameters).subscribe(response =>{
//   //     this.tickets = response.list;
//   //     this.dataSource = response.list;
//   //
//   //     this.cd.detectChanges();
//   //   });
//   // }
//   //
//   // getPageData(event: PageEvent){
//   //
//   //   this.sortParameters.page = event.pageIndex;
//   //   this.sortParameters.maxElemOnPage = event.pageSize;
//   //
//   //   this.ticketService.getTablePageData(this.sortParameters).subscribe(response =>{
//   //     this.tickets = response.list;
//   //     this.dataSource = response.list;
//   //   });
//   // }
//   //
//   // public doFilter = (filterValue: string) => {
//   //   console.log(filterValue)
//   //   filterValue = filterValue.trim(); // Remove whitespace
//   //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
//   //   this.dataSource.filter = filterValue;
//   // };
//   //
//   //
//   // onSelectProject(ticket: Ticket): void {
//   //   this.router.navigate([`/ticket/${ticket.id}`]);
//   // }
//
//
// }


import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Ticket} from "../../../models/ticket.model";
import {TicketService} from "../../../service/ticket.service";
import {Router} from "@angular/router";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../../store";
import {selectIsLoading, selectTickets} from "../../../store/selectors/tickets.selector";
import {Observable} from "rxjs";

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.css']
})
export class TicketsPageComponent implements OnInit {
  private displayedColumns: string[] = [
    'ticketName',
    'ticketType',
    'ticketStatus',
    'ticketPriority',
    'assignee',
    'reporter',
    'project',
    'parentId',
    'dueDate',
    'startDate',
    'ticketDescription'
  ]
  dataSource ;
  // private resultTickets: Map<string, Ticket>;
  private resultTickets: Ticket[];

  // @select(selectIsLoading)
  @select(selectTickets)
  isLoading: Observable<boolean>;


  @ViewChild(MatSort) sort: MatSort;

  constructor(private ticketService: TicketService,
                            private router: Router,
                            // private  cd: ChangeDetectorRef,
                            private ngRedux: NgRedux<AppState>,) {}

   ngOnInit(): void {
    // this.sortParameters = new SortParameters();
    this.dataSource = new MatTableDataSource();

     this.dataSource.sort = this.sort;
     console.log('LOADING ' , this.isLoading);
    this.isLoading.subscribe( val => {
      console.log('VAL = ', val);
      if(!val) {
        this.resultTickets = selectTickets(this.ngRedux.getState());

        console.log('RESULT_TICKETS',this.resultTickets);
        this.dataSource = new MatTableDataSource(this.resultTickets);
      }
    })


  }


}
