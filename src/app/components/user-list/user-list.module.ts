import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule
   ],
   declarations: [UserListComponent],
   exports: [UserListComponent]
})
export class UserListModule {}
