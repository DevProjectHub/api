import { IsNotEmpty, IsString } from 'class-validator';
import { INewJobVacancy } from '../interface/new-vacancy.interface';

export class NewJobVacancyDto implements INewJobVacancy {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString({ each: true })
  requirements: string[];
}
