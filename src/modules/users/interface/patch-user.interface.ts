import { ICreateUser } from './create-user.interface';

export interface IPatchUser extends Partial<ICreateUser> {}
