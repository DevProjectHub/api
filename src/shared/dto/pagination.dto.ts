import { IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { Field } from '../enum/field.enum';
import { Order } from '../enum/order.enum';
import { IPagination } from '../interface/pagination.interface';
import { Transform } from 'class-transformer';

export class PaginationDto implements IPagination {
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'page must be greater than 0' })
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'limit must be greater than 0' })
  limit: number;

  @IsOptional()
  @IsEnum(Order, { message: 'order must be asc or desc' })
  order: Order;

  @IsOptional()
  @IsEnum(Field, { message: 'field must be name or updatedAt' })
  field: Field;

  skip?: number;
}
