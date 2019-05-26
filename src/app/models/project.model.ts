import {ProjectMember} from "./project-member.model";
import {User} from "./user.model";

export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly projectDescription: string;
  readonly projectOwner: User;
  readonly projectStatus: string;           //todo add dashboards
  readonly projectCode: string;
  readonly members: ProjectMember[];
}

export const defaultProject: Project = {
  id: null,
  projectName: '',
  projectDescription: '',
  projectOwner: {
    id: null,
    login:'kirill',
    password: 'kirill',
    email: 'kirill@mail.ru'
  },
  projectStatus: '',
  projectCode: '',
  members: null
};


