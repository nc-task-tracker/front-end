import { Injectable } from '@angular/core';
import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';
import {MatDialog, MatDialogRef} from "@angular/material";

@Injectable()
export class MatConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string): MatDialogRef<MatConfirmDialogComponent>{
    return this.dialog.open(MatConfirmDialogComponent,{
      width: '390px',
      disableClose: true,
      data:{
          message: message
      }
    });
  }
}
