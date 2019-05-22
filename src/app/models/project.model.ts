import {User} from "./user.model";
import {ProjectMember} from "./project-member.model";

export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly projectDescription: string;
  readonly projectOwner: User;
  readonly projectStatus: string;           //todo add dashboards
  readonly projectCode: string;
  readonly members: ProjectMember[];
}
