export enum ProjectStatus {
  OPEN,CLOSE
}

export interface Project {
  readonly id: string;
  readonly projectName: string;
  readonly projectDescription: string;
  readonly projectOwner: string;
  readonly projectStatus: ProjectStatus;
}


