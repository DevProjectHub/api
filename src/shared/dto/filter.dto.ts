import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IFilter } from '../interface/filter.interface';

export class FilterDto implements IFilter {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  openJobVacancies?: boolean;
}
