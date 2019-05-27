import {User} from "./user.model";

export interface Profile {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly skype: string;
  readonly telephone: string;
  readonly user: User;
}

export const defaultProfile: Profile = {
  id: '',
  fullName: '',
  email:'',
  skype:'',
  telephone:'',
  user: {
    id: null,
    login: null,
    password: null,
    email:null
  }
};
// TODO back-end model

