import {User} from './user.model';

export interface Profile {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly  skype: string;
  readonly  telephone: string;
  readonly  additional: string;
  readonly  birthday: Date;
  readonly  description: string;
  readonly  user: User;
}

// TODO back-end model
