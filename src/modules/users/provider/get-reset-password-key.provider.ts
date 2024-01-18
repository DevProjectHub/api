import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GetResetPasswordKeyProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(email: string): Promise<string> {
    const key = this.generateKey();

    this.updateUser(email, key);

    return key
  }

  private generateKey(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private async updateUser(email: string, key: string): Promise<void> {
    await this.prismaService.user.update({
      where: { email },
      data: { resetPasswordKey: key },
    });
  }
}
