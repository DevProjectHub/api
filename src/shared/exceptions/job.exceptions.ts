import { NotFoundException } from '@nestjs/common';

export class JobBusinessExceptions {
  static jobNotFoundException() {
    return new NotFoundException('Job não encontrado');
  }

  static jobSubscriptionNotFoundException() {
    return new NotFoundException('Job Subscription não encontrado');
  }

  static jobSubscriptionAlreadyRegisteredException() {
    return new NotFoundException('Job Subscription já cadastrado');
  }
}
