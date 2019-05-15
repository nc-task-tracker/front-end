export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly projectDescription: string;
  readonly ownerId: string;
  readonly projectStatus: string;           //todo add dashboards
  readonly projectCode: string;
}

export const defaultProject: Project = {
  id: null,
  projectName: 'Proj_name',
  projectDescription: 'Proj_descr',
  ownerId: '',
  projectStatus: '',
  projectCode: 'PROJCODE'
};
