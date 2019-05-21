import {User} from "../../models/user.model";
export const FETCH_PROJECTS = '[Projects] Fetch projects';
export const FETCH_PROJECTS_SUCCESS = '[Projects] Fetch projects success';
export const FETCH_PROJECTS_FAILED = '[Projects] Fetch projects failed';
import {Project} from "../../models/project.model";

export function fetchProjectsAction() {
  return {
    type: FETCH_PROJECTS
  };
}

export function fetchProjectsSuccessAction(projects: Map<string, Project>) {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: {projects}
  };
}

export function fetchProjectsFailedAction(errorMessage: string) {
  return {
    type: FETCH_PROJECTS_FAILED,
    payload: {errorMessage}
  };
}
