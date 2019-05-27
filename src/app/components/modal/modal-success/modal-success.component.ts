import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {ModalCancelComponent} from "../modal-cancel/modal-cancel.component";

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) { }

  onOkClick() :void {
    this.router.navigate(['profile/1']);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
