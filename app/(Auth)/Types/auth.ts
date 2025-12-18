export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface RegisterResponse {
  register: User;
}

export interface RegisterVariables {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginResponse {
  login: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}