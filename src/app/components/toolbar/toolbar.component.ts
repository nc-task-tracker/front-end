import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store';
import {selectCurrentUser, selectCurrentUserName} from 'src/app/store/selectors/current-user.selector';
import { logoutUserAction } from 'src/app/store/actions/current-user.actions';
import { LoginUserComponent } from '../dialogs/login-user/login-user.component';
import {MatDialog, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Router} from "@angular/router";
import {CreateTicketModalComponent} from "../create-ticket-modal/create-ticket-modal.component";
import {Dashboard} from "../../models/dashboard.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FlatTreeControl} from "@angular/cdk/tree";


interface Dashboards {
  name: string;
  children?: Dashboards[];
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

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @select(selectCurrentUserName)
  readonly userName: Observable<string>;
  @select(selectCurrentUser)
  readonly currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  private transformer = (node: Dashboards, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {
  }


  onLoginClick() {
     this.matDialog.open(LoginUserComponent);
  }

  onLogoutClick() {
    this.ngRedux.dispatch(logoutUserAction());
    this.router.navigate(['home']);
  }

  createTicket() {
    this.matDialog.open(CreateTicketModalComponent);
  }
}
