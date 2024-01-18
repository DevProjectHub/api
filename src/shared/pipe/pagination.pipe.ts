import { PipeTransform } from '@nestjs/common';
import { Field } from 'src/shared/enum/field.enum';
import { Order } from 'src/shared/enum/order.enum';
import { IPagination } from 'src/shared/interface/pagination.interface';
import { PaginationDto } from '../dto/pagination.dto';

export class PaginationPipe implements PipeTransform {
  transform(value: PaginationDto): IPagination {
    let { page, limit, order, field } = value;

    const pagination = {
      page: page ?? 1,
      limit: limit ?? 10,
      order: order ?? Order.ASC,
      field: field ?? Field.NAME,
    };

    pagination['skip'] = (pagination.page - 1) * pagination.limit;

    return pagination as IPagination;
  }
}
