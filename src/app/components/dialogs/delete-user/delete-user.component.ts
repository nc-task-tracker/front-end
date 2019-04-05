import { Component, OnInit, Inject } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDialogData } from 'src/app/models/dialog-data.models';
import { AppState } from 'src/app/store';
import { DialogResult } from 'src/app/models/dialog-result';
import { deleteUserAction } from 'src/app/store/actions/users.actions';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userId: string;

  constructor(private ngRedux: NgRedux<AppState>,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) { }

  ngOnInit() {
    this.userId = this.data.userId;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {
        this.ngRedux.dispatch(deleteUserAction(this.userId));
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }
}
