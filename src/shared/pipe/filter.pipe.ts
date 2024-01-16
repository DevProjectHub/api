import { PipeTransform } from '@nestjs/common';
import { IFilter } from '../interface/filter.interface';
import { FilterDto } from '../dto/filter.dto';

export class FilterPipe implements PipeTransform {
  transform(value: FilterDto): IFilter {
    const { name, openJobVacancies, role } = value;

    return {
      name: name ?? '',
      role: role ?? '',
      openJobVacancies: openJobVacancies ?? true,
    };
  }
}
