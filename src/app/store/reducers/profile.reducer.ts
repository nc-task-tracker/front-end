import {Profile} from "../../models/profile.model";
import {Reducer} from "redux";
import {
  FETCH_DASHBOARDS, FETCH_DASHBOARDS_SUCCESS, FETCH_FILTERS, FETCH_FILTERS_SUCCESS,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS
} from "../actions/Profile.action";
import {Project} from "../../models/project.model";
import {Dashboard} from "../../models/dashboard.model";
import {Filter} from "../../models/filter-item.model";

export interface ProfileState {
  readonly profile: Profile;
  // readonly dashboards: Dashboard;
  // readonly filters: Filter;
    readonly projects: Project[];
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  profile: null,
  projects: null,
  isLoading: false
};

export const profileReducer: Reducer<ProfileState> = (state: ProfileState = INITIAL_STATE, action):ProfileState => {
  switch (action.type) {
    case FETCH_PROFILE: {
      return {...state, isLoading: true};
    }
    case FETCH_PROFILE_SUCCESS: {
      return {...state, profile: action.payload.profile, isLoading: false};
    }
    case FETCH_DASHBOARDS: {
      return { ...state, isLoading: true };
    }
    case FETCH_DASHBOARDS_SUCCESS: {
      return { ...state, profile: action.payload.profile, isLoading: false };
    }
    case FETCH_FILTERS: {
      return { ...state, isLoading: true };
    }
    case FETCH_FILTERS_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    case FETCH_PROJECTS: {
      return { ...state, isLoading: true };
    }
    case FETCH_PROJECTS_SUCCESS: {
      return { ...state, ...action.payload, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
