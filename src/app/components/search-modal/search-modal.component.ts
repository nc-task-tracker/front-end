import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";
import {of} from "rxjs";


export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen'},
  { name: 'Helium'},
  { name: 'Lithium'},
];

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  constructor(public dialogRef: MatDialogRef<SearchModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private matDialog: MatDialog,) { }

  ngOnInit() {
/*    this.assigneeAutoComplete$ = this.ticketForm.controls.assignee.valueChanges.pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(value => this.ticketService.getAssigneeList(value.toLowerCase()).pipe(
        catchError(_ => {
          return of(null);
        })
      ))
    );*/
  }

  onSaveClick() :void {
    this.router.navigate(['dashboard/1']);
    this.dialogRef.close();
  }
  onCancelClick() :void {
    this.router.navigate(['dashboard/1']);
    this.dialogRef.close();
  }

}
