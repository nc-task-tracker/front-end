import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";

interface Filters {
  name: string;
  children?: Filters[];
}

const TREE_DATA2: Filters[] = [
  {
    name: 'Filters',
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
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor() { this.dataSource2.data = TREE_DATA2;}

  private transformer2 = (node: Filters, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl2 = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener2 = new MatTreeFlattener(
    this.transformer2, node => node.level, node => node.expandable, node => node.children);

  dataSource2 = new MatTreeFlatDataSource(this.treeControl2, this.treeFlattener2);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }

}
