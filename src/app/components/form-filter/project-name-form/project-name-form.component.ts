import {Component, OnInit} from '@angular/core';
import {AbstractSelectFormComponent, SEARCH_BY_NAME} from '../abstract-select-form/abstract-select-form.component';
import {TicketService} from '../../../service/ticket.service';
import {ProjectService} from '../../../service/project.service';

@Component({
  selector: 'app-project-name-form',
  templateUrl: './project-name-form.component.html',
  styleUrls: ['./project-name-form.component.css'],
  providers: [
    //{provide: SEARCH_BY_NAME, useClass: TicketService}
    {provide: SEARCH_BY_NAME, useClass: ProjectService}
  ]
})
export class ProjectNameFormComponent extends AbstractSelectFormComponent {


}


