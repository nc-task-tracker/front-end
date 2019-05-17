import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  fullName: string;

  onChangeClick() {
    this.router.navigate (['change-profile']);
  }
  constructor(private router: Router) { }



  ngOnInit() {
  }

}
