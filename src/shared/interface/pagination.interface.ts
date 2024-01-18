import { Field } from '../enum/field.enum';
import { Order } from '../enum/order.enum';

export interface IPagination {
  page: number;
  limit: number;
  order: Order;
  field: Field;
  skip: number;
}
