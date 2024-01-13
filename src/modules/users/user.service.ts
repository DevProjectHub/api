import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateUser } from './interface/create-user.interface';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: string) {
    return await this.prismaService.user.findFirst({
      where: { id },
      select: { password: false },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async createUser(data: ICreateUser) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async updateUser(
    id: string,
    data: { name: string; email: string; password: string },
  ) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
