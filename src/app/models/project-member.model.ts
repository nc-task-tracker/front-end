import {Profile} from "./profile.model";
import {ProjectRole} from "./Enums/project-role.enum";

export class ProjectMember {
  readonly id: string;
  readonly profile: Profile;
  readonly role: ProjectRole;

  constructor(profile: Profile,role: ProjectRole){
    this.profile = profile;
    this.role = role;
  }
}
