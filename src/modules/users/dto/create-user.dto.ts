import { ICreateUser } from '../interface/create-user.interface';

export class CreateUserDto implements ICreateUser {
  email: string;
  password: string;
}
