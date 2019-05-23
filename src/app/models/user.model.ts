export const defaultUser: User = {
  id: null,
  login: '',
  password: '',
  email: ''
};

export const testUser: User = {
  id: null,
  login: 'Roman',
  password: '111',
  email: 'Gemer_31@mail.ru'
};

export interface User {
  readonly id: string;
  readonly login: string;
  // readonly dateOfBirth: Date;
  readonly email: string;
  readonly password: string;
}

