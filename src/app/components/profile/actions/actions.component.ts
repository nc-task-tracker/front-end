import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  Actions: Section[] = [
    {
      name: 'Admin added member Alex Novel',
      updated: new Date ('1/1/16'),
    },
    {
      name: 'Alex Novel has created a project 1234',
      updated: new Date ('1/17/16'),
    },
    {
      name: 'Alex Novel has an assignment on Vlad D',
      updated: new Date ('1/28/16'),
    },
    {
      name: 'Alex Novel has an assignment on Vlad D',
      updated: new Date ('1/28/16'),
    },
    {
      name: 'Alex Novel has an assignment on Vlad D',
      updated: new Date ('1/28/16'),
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
