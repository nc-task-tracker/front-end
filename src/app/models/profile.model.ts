import {User} from "./user.model";

export interface Profile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly login: string;
  readonly user: User;
}
