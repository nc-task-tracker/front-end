import {User} from "../../models/user.model";
export const FETCH_PROJECTS = '[Projects] Fetch projects';
export const FETCH_PROJECTS_SUCCESS = '[Projects] Fetch projects success';
export const FETCH_PROJECTS_FAILED = '[Projects] Fetch projects failed';
export const FETCH_PROFILE= '[Profile] Fetch profile';
export const FETCH_PROFILE_SUCCESS = '[Profile] Fetch profile success';
export const FETCH_PROFILE_FAILED = '[Profile] Fetch profile failed';
import {Project} from "../../models/project.model";
import {Profile} from "../../models/profile.model";

export function fetchProfileAction(profileId: string) {
  return {
    type: FETCH_PROFILE,
    payload: {profileId}
  };
}
export function fetchProfileSuccessAction(profile: Profile) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: {profile}
  };
}
export function fetchProfileFailedAction(errorMessage: string) {
  return {
    type: FETCH_PROFILE_FAILED,
    payload: {errorMessage}
  };
}

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

