export interface Profile {
  readonly id: string;
  readonly fullName: string;
  readonly email?: string;
  readonly skype?: string;
  readonly telephone?: string;
  readonly additional?: string;
  readonly birthday?: Date;
  readonly description?: string;
}

export const defaultProfile: Profile = {
  id: '',
  fullName: '',
};
