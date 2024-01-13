import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthBusinessExceptions {
  static userNotFoundException() {
    return new NotFoundException('Usuario não encontrado');
  }
  static emailNotFoundException() {
    return new NotFoundException('O e-mail informado não foi cadastrado.');
  }

  static emailAlreadyRegisteredException() {
    return new ConflictException('O e-mail informado já foi cadastrado.');
  }

  static invalidCredentialsException() {
    return new ForbiddenException('Credenciais inválidas.');
  }

  static emailNotVerifiedException() {
    return new ForbiddenException('Usuário não foi confirmado.');
  }

  static emailAlreadyVerifiedException() {
    return new ForbiddenException('Usuário já confirmado.');
  }

  static invalidTokenException() {
    return new UnauthorizedException('Token inválido.');
  }
}
