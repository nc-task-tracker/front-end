export interface User {
  readonly token: string;
  readonly id: string;
  readonly name: string;
  readonly dateOfBirth: Date;
  readonly email: string;
  readonly password: string;
}

export const defaultUser: User = {
  token: '',
  id: null,
  name: '',
  password: '',
  dateOfBirth: null,
  email: ''
};
