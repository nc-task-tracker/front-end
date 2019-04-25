import { ChangeProfile } from 'src/app/models/change-profile.model';
import { Reducer } from 'redux';
import {SAVE_PROFILE_SUCCESS } from '../actions/change-profile.actions';

const INITIAL_STATE = new Map<string, ChangeProfile>();

export const changeProfileReducer: Reducer<Map<string, ChangeProfile>> = (state: Map<string, ChangeProfile> = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PROFILE_SUCCESS: {
      const {changeProfile} = action.payload;
      const updatedState = new Map(state).set(changeProfile.id, changeProfile);
      return updatedState;
    }
    default: {
      return state;
    }
  }
};
