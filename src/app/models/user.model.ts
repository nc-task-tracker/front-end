export interface User {
  readonly id: string;
  readonly name: string;
  readonly password: string;
  readonly email: string;
}

export const defaultUser: User = {
  id: null,
  name: '',
  password: '',
  email: ''
};
