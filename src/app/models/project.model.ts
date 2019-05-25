export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly description: string;
  readonly ownerId: string;
  readonly projectStatus: string;           //todo add dashboards
  readonly projectCode: string;
}

export const defaultProject: Project = {
  id: null,
  projectName: 'Proj',
  description: 'Proj',
  ownerId: '1',
  projectStatus: '',
  projectCode: 'PROJ'
};
