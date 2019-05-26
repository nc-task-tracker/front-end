import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {AutoUnsubscribe} from "../../service/auto-unsubscribe";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalUserStorageService} from "../../service/global-storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TicketService} from "../../service/ticket.service";
import {Profile} from "../../models/profile.model";
import {ProjectRole} from "../../models/Enums/project-role.enum";
import {ProjectMemberService} from "../../service/project-member.service";
import {allProjectRoleMembers, ProjectRoleObject} from "../../models/project-role.model";
import {ProjectMember} from "../../models/project-member.model";

@Component({
  selector: 'app-project-member-modal',
  templateUrl: './project-member-modal.component.html',
  styleUrls: ['./project-member-modal.component.css']
})
export class ProjectMemberModalComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

  private memberForm  : FormGroup;
  private roles = allProjectRoleMembers;
  private possibleUsers: Profile[];
  private selectedRole: ProjectRoleObject;
  private selectedUser: Profile;

  constructor( @Inject(MAT_DIALOG_DATA) public data,
              private formBuilder: FormBuilder,
              private ngRedux: NgRedux<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private storageService: GlobalUserStorageService,
              public dialogRef: MatDialogRef<ProjectMemberModalComponent>,
              private projectMemberService: ProjectMemberService) {
    super();
  }

  ngOnInit() {
    const id = this.data;

    this.projectMemberService.getNoProjectMembers(id).subscribe(value =>{
      this.possibleUsers = value as Profile[];
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onClickAddMember(): void{
    const projectMember = new ProjectMember(this.selectedUser,this.selectedRole.role);

    // this.projectMemberService.addMember(this.data, projectMember).subscribe();

    this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
