import {Profile} from "../../models/profile.model";
import {Reducer} from "redux";
import {FETCH_PROFILE, FETCH_PROFILE_SUCCESS} from "../actions/Profile.action";

export interface ProfileState {
  readonly profile: Profile;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  profile: null,
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
    default: {
      return state;
    }
  }
};
