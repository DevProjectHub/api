import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateUser } from '../interface/create-user.interface';
import { User } from '@prisma/client';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';

@Injectable()
export class CreateUserProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(data: ICreateUser): Promise<User> {
    this.validation(data.email);

    return await this.createUser(data);
  }

  private async createUser(data: ICreateUser): Promise<User> {
    return (await this.prismaService.user.create({
      data: { ...data, isEmailConfirmed: true }, //email sempre confirmado até implementar sistema de email
      select: { password: false },
    })) as User;
  }

  private async validation(email: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
      select: { id: true },
    });

    if (user) throw AuthBusinessExceptions.emailAlreadyRegisteredException();
  }
}
