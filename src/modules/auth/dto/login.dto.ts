import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILogin } from '../interface/login.interface';
import { Transform } from 'class-transformer';
import { HashUtil } from 'src/utils/hash.util';

export class LoginDto implements ILogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => HashUtil.hash(value))
  password: string;
}
