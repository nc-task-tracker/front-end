export interface Profile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
}

export const defaultProfile: Profile = {
  id: '',
  firstName: '',
  lastName: ''
};
