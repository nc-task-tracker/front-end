import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  constructor(private router: Router) {

  }
  onCancelClick() {
    this.router.navigate(['profile']);
  }
  ngOnInit() {
  }

}
