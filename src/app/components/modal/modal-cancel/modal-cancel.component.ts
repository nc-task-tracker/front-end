import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {ModalSuccessComponent} from "../modal-success/modal-success.component";

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.css']
})
export class ModalCancelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private matDialog: MatDialog,

  ) { }

  onYesClick() :void {
    this.router.navigate(['profile/1']);
    this.dialogRef.close();
    this.matDialog.open(ModalSuccessComponent);
  }
  onNoClick() :void {
    this.router.navigate(['change-profile']);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
