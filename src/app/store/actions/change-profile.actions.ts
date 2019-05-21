import {ChangeProfile} from '../../models/change-profile.model';

export const SAVE_PROFILE  = '[ChangeProfile] Save profile';
export const SAVE_PROFILE_SUCCESS  = '[ChangeProfile] Save profile success';
export const SAVE_PROFILE_FAILURE  = '[ChangeProfile] Save profile failure';


export const saveProfileAction = (changeProfile: ChangeProfile) => ({
  type: SAVE_PROFILE,
  payload: {changeProfile}
});
export const saveProfileSuccessAction = (changeProfile: ChangeProfile) => ({
  type: SAVE_PROFILE_SUCCESS,
  payload: {changeProfile}
});
export const saveProfileFailureAction = (changeProfile: ChangeProfile) => ({
  type: SAVE_PROFILE_FAILURE
});
