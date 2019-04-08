export interface User {
  readonly id: string;
  readonly name: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly token: string;
}

export const defaultUser: User = {
  id: null,
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
  token: ''
};
