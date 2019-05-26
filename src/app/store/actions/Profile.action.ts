import {Project} from "../../models/project.model";
import {Profile} from "../../models/profile.model";
import {Dashboard} from "../../models/dashboard.model";
import {Filter} from "../../models/filter-item.model";

export const FETCH_PROFILE= '[Profile] Fetch profile';
export const FETCH_PROFILE_SUCCESS = '[Profile] Fetch profile success';
export const FETCH_PROFILE_FAILED = '[Profile] Fetch profile failed';
export const FETCH_DASHBOARDS = '[Dashboards] Fetch dashboards';
export const FETCH_DASHBOARDS_SUCCESS = '[Dashboards] Fetch dashboards success';
export const FETCH_DASHBOARDS_FAILED = '[Dashboards] Fetch dashboards failed';
export const FETCH_FILTERS = '[Filters] Fetch filters';
export const FETCH_FILTERS_SUCCESS = '[Filters] Fetch filters success';
export const FETCH_FILTERS_FAILED = '[Filters] Fetch filters failed';
export const FETCH_PROJECTS = '[Projects] Fetch projects';
export const FETCH_PROJECTS_SUCCESS = '[Projects] Fetch projects success';
export const FETCH_PROJECTS_FAILED = '[Projects] Fetch projects failed';

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

export function fetchDashboardsAction() {
  return {
    type: FETCH_DASHBOARDS
  };
}
export function fetchDashboardsSuccessAction(dashboards: Map<string, Dashboard>) {
  return {
    type: FETCH_DASHBOARDS_SUCCESS,
    payload: {dashboards}
  };
}
export function fetchDashboardsFailedAction(errorMessage: string) {
  return {
    type: FETCH_DASHBOARDS_FAILED,
    payload: {errorMessage}
  };
}

export function fetchFiltersAction() {
  return {
    type: FETCH_FILTERS
  };
}
export function fetchFiltersSuccessAction(filters: Map<string, Filter>) {
  return {
    type: FETCH_FILTERS_SUCCESS,
    payload: {filters}
  };
}
export function fetchFiltersFailedAction(errorMessage: string) {
  return {
    type: FETCH_FILTERS_FAILED,
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

