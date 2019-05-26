import {Reducer} from "redux";
import {CREATE_PROJECT, CREATE_PROJECT_SUCCESS} from "../actions/create-project.actions";
import {Project} from "../../models/project.model";
import {FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS} from "../actions/Profile.action";

export interface ProjectsState {
  readonly projects: Project[];
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  projects: null,
  isLoading: false
};

export const projectReducer: Reducer<ProjectsState> = (state: ProjectsState = INITIAL_STATE, action):ProjectsState => {
  switch (action.type) {
    case CREATE_PROJECT:
    case CREATE_PROJECT_SUCCESS:
    default: {
      return state;
    }
  }
};
