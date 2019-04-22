import {User} from "./user.model";

export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly projectDescription: string;
  readonly ownerId: string;
  readonly projectStatus: string;           //todo add dashboards
}

export const defaultProject: Project = {
  id: null,
  projectName: '',
  projectDescription: '',
  ownerId: '',
  projectStatus: ''
};
