import {Reducer} from "redux";
import {UPDATE_CURRENT_USER} from "../actions/current-user.actions";
import {CREATE_PROJECT, CREATE_PROJECT_SUCCESS} from "../actions/create-project.actions";
import {Project} from "../../models/project.model";
import {User} from "../../models/user.model";
import {FETCH_USERS, FETCH_USERS_SUCCESS} from "../actions/users.actions";
import {FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS} from "../actions/Profile.action";

export interface ProjectsState {
  readonly projects: Map<string, Project>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  projects: new Map<string, Project>(),
  isLoading: false
};

export const projectReducer: Reducer<ProjectsState> = (state: ProjectsState = INITIAL_STATE, action):ProjectsState => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      return { ...state, isLoading: true };
    }
    case FETCH_PROJECTS_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    case CREATE_PROJECT:
    case CREATE_PROJECT_SUCCESS:
    default: {
      return state;
    }
  }
};
