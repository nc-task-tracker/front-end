import { Component, OnInit } from '@angular/core';
import {AbstractSelectFormComponent, SEARCH_BY_NAME} from "../abstract-select-form/abstract-select-form.component";
import {TicketService} from "../../../service/ticket.service";
import {TicketServiceService} from "../../../service/ticket-service.service";

@Component({
  selector: 'app-project-name-form',
  templateUrl: './ticket-name-form.component.html',
  styleUrls: ['./ticket-name-form.component.css'],
  providers: [
    { provide: SEARCH_BY_NAME, useClass: TicketService}
  ]
})
export class TicketNameFormComponent extends AbstractSelectFormComponent{

}


