import { IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';
import { Field } from '../enum/field.enum';
import { Order } from '../enum/order.enum';
import { IPagination } from '../interface/pagination.interface';

export class PaginationDto implements IPagination {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'page must be greater than 0' })
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'limit must be greater than 0' })
  limit: number;

  @IsNotEmpty()
  @IsEnum(Order, { message: 'order must be asc or desc' })
  order: Order;

  @IsNotEmpty()
  @IsEnum(Field, { message: 'field must be name or updatedAt' })
  field: Field;

  @IsNotEmpty()
  @IsNumber()
  skip: number;
}
