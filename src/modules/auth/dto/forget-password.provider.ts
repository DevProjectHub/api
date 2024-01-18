import { IsNotEmpty, IsString } from 'class-validator';
import { IForgetPassword } from '../interface/forget-password.interface';

export class ForgetPasswordDto implements IForgetPassword {
  @IsNotEmpty()
  @IsString()
  email: string;
}
