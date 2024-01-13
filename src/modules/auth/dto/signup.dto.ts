import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ISignup } from '../interface/signup.interface';

class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

class Profile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  github?: string;
}

export class SignupDto implements ISignup {
  @ValidateNested()
  user: User;

  @ValidateNested()
  profile: Profile;
}
