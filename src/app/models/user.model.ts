export interface User {
  readonly id: string;
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly token: string;
}

export const defaultUser: User = {
  id: null,
  name: '',
  password: '',
  email: '',
  token: ''
};

export const testUser: User = {
  id: null,
  name: 'Roman',
  password: '111',
  email: 'Gemer_31@mail.ru',
  token: '111222333'
};

