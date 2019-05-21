import {ChangeProfile} from 'src/app/models/change-profile.model';
import {Reducer} from 'redux';
import {SAVE_PROFILE_SUCCESS} from '../actions/change-profile.actions';

export interface ChangeProfileState {
  readonly changeProfile: Map<string, ChangeProfile>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  changeProfile: new Map<string, ChangeProfile> (),
  isLoading: false
};

export const changeProfileReducer: Reducer<ChangeProfileState> = (state: ChangeProfileState = INITIAL_STATE, action): ChangeProfileState => {
  switch (action.type) {
    case SAVE_PROFILE_SUCCESS: {
      const {changeProfile} = action.payload;
      const updatedChangedProfile = new Map (state.changeProfile).set (changeProfile.id, changeProfile);
      return {...state, changeProfile: updatedChangedProfile, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
