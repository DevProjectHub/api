import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICreateProject } from '../interface/create-project.interface';

export class CreateProjectDto implements ICreateProject {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  ownerRole: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
