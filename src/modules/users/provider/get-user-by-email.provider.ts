import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IGetUserByEmail } from '../interface/get-user-by-email.interface';

@Injectable()
export class GetUserByEmailProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(email: string): Promise<IGetUserByEmail> {
    const user = await this.getUserByEmail(email);

    return this.postValidation(user);
  }

  private async getUserByEmail(email: string): Promise<IGetUserByEmail> {
    return await this.prismaService.user.findFirst({
      where: { email },
      include: { profile: { select: { id: true } } },
    });
  }

  private postValidation<T>(user: T): T {
    if (!user) throw new Error('User not found');

    return user;
  }
}
