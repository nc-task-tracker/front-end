import {Profile} from "./profile.model";
import {ProjectRole} from "./project-role.model";

export interface ProjectMember {
  readonly id: string
  readonly profile: Profile;
  readonly role: ProjectRole;
}
