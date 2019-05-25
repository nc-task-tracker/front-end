export interface Profile {
  readonly id: string;
  readonly fullName: string;
}

export const defaultProfile: Profile = {
  id: '',
  fullName: ''
};
// TODO back-end model
