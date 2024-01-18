import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { HTTP_RES_TRANSFORM_PAGINATE } from '../decorators/paginate.decorator';
import { IPagination } from '../interface/pagination.interface';
import { Request } from 'express';

interface Response<T> extends IPagination {
  data: T;
}

@Injectable()
export class PaginateInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    const query = request.query as unknown as IPagination;

    return next.handle().pipe(
      map((data) => {
        const paginateReflector = this.reflector.get(
          HTTP_RES_TRANSFORM_PAGINATE,
          context.getHandler(),
        );

        if (paginateReflector) {
          return {
            data,
            field: query.field,
            order: query.order,
            limit: query.limit,
            page: query.page,
          } as Response<T>;
        }

        return data as Response<T>;
      }),
    );
  }
}
