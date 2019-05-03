export interface Profile {
  readonly id: string;
  readonly FirstName: string;
  readonly LastName: string;
}

export const defaultProfile: Profile = {
  id: null,
  FirstName: 'firstName',
  LastName: ''
};
