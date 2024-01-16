import { IsOptional, IsString } from 'class-validator';
import { IPatchUser } from '../interface/patch-user.interface';

export class PatchUserDto implements IPatchUser {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
