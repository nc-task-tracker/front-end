import { AppState } from '..';

export const selectProjects = (state: AppState) => state.projects.projects;

export const selectProjectsIsLoading = (state: AppState) => state.projects.isLoading;
