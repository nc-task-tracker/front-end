export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ownerId: string;
  readonly projectStatus: string;           //todo add dashboards
  readonly code: string;
}

export const defaultProject: Project = {
  id: null,
  name: '',
  description: '',
  ownerId: '',
  projectStatus: '',
  code: ''
};
