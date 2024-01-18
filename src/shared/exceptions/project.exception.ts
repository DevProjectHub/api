import { ConflictException, NotFoundException } from '@nestjs/common';

export class ProjectBusinessExceptions {
  static projectNotFoundException() {
    return new NotFoundException('Projeto não encontrado');
  }

  static projectAlreadyRegisteredException() {
    return new ConflictException('Já existe um project com este nome');
  }

  static notPartOfProjectException() {
    return new NotFoundException('Você não faz parte desse projeto');
  }
}
