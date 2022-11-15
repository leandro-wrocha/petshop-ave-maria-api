export interface ISignInDTO {
  email: string;
  password: string;
}

export interface Role {
  role: 'admin' | 'client' | 'employee';
}

export interface IUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  roleName: Role['role'];
}
