import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateUser } from '../interface/create-user.interface';

@Injectable()
export class CreateUserProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(data: ICreateUser) {
    this.preValidation(data.email);
    return await this.createUser(data);
  }

  private async createUser(data: ICreateUser) {
    return await this.prismaService.user.create({
      data: { ...data, isEmailConfirmed: true }, //email sempre confirmado até implementar sistema de email
    });
  }

  private async preValidation(email: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user) throw new Error('User not found');

    return user;
  }
}
