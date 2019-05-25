import {Project} from "./project.model";

export interface ChangeProfile {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly skype: string;
  readonly telephone: string;
  readonly additional: string;
  readonly birthday: Date;
  readonly description: string;
}
export const defaultChangeProfile: ChangeProfile = {
  id: '1',
  fullName: '',
  email: '',
  skype: '',
  telephone: '',
  additional: '',
  birthday: new Date(''),
  description: ''
};
