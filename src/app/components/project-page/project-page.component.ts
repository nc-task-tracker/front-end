import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {Issue} from "../../models/issue.model";



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Issue[] = [
  {id: '1', name: 'Hydrogen', type: 'open', status: 'open',priority: '1',start_date: '1',due_date: '2',description: '3'}
];


@Component({
  selector:'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit{

  displayedColumns: string[] = ['id','name', 'type', 'status','priority','start_date','due_date','description'];
  dataSource = ELEMENT_DATA;


  constructor() {
  }

  ngOnInit(): void {
  }

}
