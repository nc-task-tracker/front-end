import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";
import {fetchUsersAction} from "../../../store/actions/users.actions";
import {fetchProjectsAction} from "../../../store/actions/Profile.action";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../../store";

interface Projects {
  name: string;
  children?: Projects[];
}

const TREE_DATA3: Projects[] = [
  {
    name: 'Projects',
    children: [
      {name: 'Main'},
      {name: 'Dash1'},
      {name: 'Dash2'},
      {name: 'Dash3'},
      {name: 'Dash4'}
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private ngRedux: NgRedux<AppState>) {
    this.dataSource3.data = TREE_DATA3;}

  private transformer3 = (node: Projects, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl3 = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener3 = new MatTreeFlattener(
    this.transformer3, node => node.level, node => node.expandable, node => node.children);

  dataSource3 = new MatTreeFlatDataSource(this.treeControl3, this.treeFlattener3);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.ngRedux.dispatch(fetchProjectsAction());
  }

}
