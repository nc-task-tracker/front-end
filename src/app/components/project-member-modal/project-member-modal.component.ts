import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TicketService} from "../../service/ticket.service";
import {selectCurrentUser, selectCurrentUserName} from "../../store/selectors/current-user.selector";
import {Observable, of} from "rxjs";
import {Assignee} from "../../models/assignee.model";
import {User} from "../../models/user.model";
import {allTicketPriority, allTicketTypes} from "../../models/ticket.model";
import {Project} from "../../models/project.model";
import {catchError} from "rxjs/operators";
import {createTicketAction} from "../../store/actions/create-ticket.actions";
import {Profile} from "../../models/profile.model";
import {ProjectRole} from "../../models/Enums/project-role.enum";
import {ProjectMemberService} from "../../service/project-member.service";

@Component({
  selector: 'app-project-member-modal',
  templateUrl: './project-member-modal.component.html',
  styleUrls: ['./project-member-modal.component.css']
})
export class ProjectMemberModalComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private memberForm: FormGroup;
  private roles = ProjectRole;
  private possibleUsers: Profile[];

  constructor(private formBuilder: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private storageService: GlobalUserStorageService,
              public dialogRef: MatDialogRef<ProjectMemberModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ticketService: TicketService,
              private projectMemberService: ProjectMemberService) {
    super();
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));

    this.projectMemberService.getNoProjectMembers(null).subscribe(value =>{
      this.possibleUsers = value as Profile[];
      console.log(this.possibleUsers);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTicket() {
    // this.ticketForm.controls.assignee.setValue(this.currentAssigneeId);
    // const formValue = this.ticketForm.getRawValue();
    // console.log("formValue:", formValue);
    // this.ngRedux.dispatch(createTicketAction(formValue as any));
    // this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
