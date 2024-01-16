import { IsOptional, IsString } from 'class-validator';
import { IPatchProject } from '../interface/update-project.interface';

export class PatchProjectDto implements IPatchProject {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
