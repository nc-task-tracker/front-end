import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";


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
