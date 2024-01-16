import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GetUserProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(id: string) {
    const user = await this.getUser(id);

    return this.postValidation(user);
  }

  private async getUser(id: string): Promise<User> {
    return (await this.prismaService.user.findFirst({
      where: { id },
      select: { password: false },
    })) as User;
  }

  private postValidation(user: User) {
    if (!user) throw new Error('User not found');

    return user;
  }
}
