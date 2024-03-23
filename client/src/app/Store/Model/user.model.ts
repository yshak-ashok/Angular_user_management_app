import { EntityState } from '@ngrx/entity';

export interface Users {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  image?: string;
}

export interface userCredential {
  email: string;
  password: string;
}

export interface userInfo {
  _id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}
export interface UserModel extends EntityState<Users> {
  isDuplicate: boolean;
}
