import { IsOptional, IsString } from 'class-validator';
import { IPatchProfile } from '../interface/patch-profile.interface';

export class PatchProfileDto implements IPatchProfile {
  @IsOptional()
  @IsString()
  name?: string;

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
