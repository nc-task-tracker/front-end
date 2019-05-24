import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.css']
})
export class ModalCancelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCancelComponent>,
    private router: Router,
  ) { }

  onYesClick(){
    this.router.navigate(['profile/1']);
  }
  onNoClick() {
     this.router.navigate(['change-profile']);
  }

  ngOnInit() {
  }

}
