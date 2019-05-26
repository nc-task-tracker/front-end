import {User} from "./user.model";

export interface Profile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly user: User;
}

export const defaultProfile: Profile = {
  id: '',
  firstName: '',
  lastName: '',
  user: {
    id: null,
    login: null,
    password: null,
    email:null
  }
};
// TODO back-end model

