import {ProjectRole, ProjectRoleLabel} from "./Enums/project-role.enum";

export interface ProjectRoleObject {
  readonly role: ProjectRole;
  readonly title: string;
}

export const allProjectRoleMembers: ProjectRoleObject[] = [
  {
    role: ProjectRole.MANAGER,
    title: ProjectRoleLabel.MANAGER
  },
  {
    role: ProjectRole.DEVELOPER,
    title: ProjectRoleLabel.DEVELOPER
  }
  ];
