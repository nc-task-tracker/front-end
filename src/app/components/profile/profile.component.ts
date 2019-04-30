import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {select} from "@angular-redux/store";
import {changeProfile} from "../../store/selectors/change-profile.selector";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {ChangeProfile} from "../../models/change-profile.model";
import {GlobalUserStorageService} from "../../service/global-storage.service";

interface Dashboards {
  name: string;
  children?: Dashboards[];
}
interface Filters {
  name: string;
  children?: Filters[];
}
interface Projects {
  name: string;
  children?: Projects[];
}

const TREE_DATA: Dashboards[] = [
  {
    name: 'Dashboards',
    children: [
      {name: 'Main'},
      {name: 'Dash1'},
      {name: 'Dash2'},
      {name: 'Dash3'},
      {name: 'Dash4'}
    ]
  },
];
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

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @select(changeProfile)
  changeProfile: Observable<ChangeProfile>;


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

  onChangeClick() {
    this.router.navigate (['change-profile']);
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: GlobalUserStorageService) {
    this.dataSource.data = TREE_DATA;
    this.dataSource2.data = TREE_DATA2;
    this.dataSource3.data = TREE_DATA3;
  }
  private transformer = (node: Dashboards, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  private transformer2 = (node: Filters, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  private transformer3 = (node: Projects, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeControl2 = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeControl3 = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);
  treeFlattener2 = new MatTreeFlattener(
    this.transformer2, node => node.level, node => node.expandable, node => node.children);
  treeFlattener3 = new MatTreeFlattener(
    this.transformer3, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSource2 = new MatTreeFlatDataSource(this.treeControl2, this.treeFlattener2);
  dataSource3 = new MatTreeFlatDataSource(this.treeControl3, this.treeFlattener3);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isLogin: boolean = false;

  ngOnInit() {
     const {userId} = this.route.snapshot.params;

     const user = this.localStorage.currentUser;
     this.isLogin = user && user.id === userId;
  }

}
