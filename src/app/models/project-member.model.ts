import {Profile} from "./profile.model";
import {ProjectRole} from "./Enums/project-role.enum";

export interface ProjectMember {
  readonly id: string
  readonly profile: Profile;
  readonly role: ProjectRole;
}
