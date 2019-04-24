import {Reducer} from "redux";
import {UPDATE_CURRENT_USER} from "../actions/current-user.actions";
import {CREATE_PROJECT, CREATE_PROJECT_SUCCESS} from "../actions/create-project.actions";
import {Project} from "../../models/project.model";

export const projectReducer: Reducer<Project> = (state: Project = null, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
    case CREATE_PROJECT_SUCCESS:
    default: {
      return state;
    }
  }
};
