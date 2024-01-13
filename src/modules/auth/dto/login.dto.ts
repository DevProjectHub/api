import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILogin } from '../interface/login.interface';

export class LoginDto implements ILogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
