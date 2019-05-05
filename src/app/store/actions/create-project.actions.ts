import {Project} from "../../models/project.model";

export const CREATE_PROJECT = '[Project] Create project';
export const CREATE_PROJECT_SUCCESS = '[Project] Create project success';

export function createProjectAction(project: Project) {
  return {
    type: CREATE_PROJECT,
    payload: {project}
  };
}

export function createProjectSuccessAction(project: Project) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: {project}
  };
}
