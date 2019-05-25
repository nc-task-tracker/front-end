import { Component, OnInit } from '@angular/core';
import {Assignee} from '../../../models/assignee.model';
import {AbstractSearchFormComponent, SEARCH_BY_STRING} from '../abstract-search-form/abstract-search-form.component';
import {TicketService} from '../../../service/ticket.service';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-assignee-search',
  templateUrl: './assignee-search.component.html',
  styleUrls: ['./assignee-search.component.css'],
  providers: [
    { provide: SEARCH_BY_STRING, useClass: TicketService }
  ]
})
export class AssigneeSearchComponent extends AbstractSearchFormComponent <Assignee> {

}
