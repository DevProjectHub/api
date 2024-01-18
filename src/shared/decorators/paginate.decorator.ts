import { SetMetadata } from '@nestjs/common';

export const HTTP_RES_TRANSFORM_PAGINATE = '__customHttpResTransformPagenate__';

export const Paginate: MethodDecorator = (
  _target,
  _key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value);
};
