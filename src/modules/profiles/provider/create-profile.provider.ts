import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateProfile } from '../interface/create-profile.interface';

@Injectable()
export class CreateProfileProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(userId: string, data: ICreateProfile): Promise<ICreateProfile> {
    await this.preValidation(userId);

    return await this.createProfile(userId, data);
  }

  private async preValidation(userId: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('User not found');
  }

  private async createProfile(
    userId: string,
    data: ICreateProfile,
  ): Promise<ICreateProfile> {
    return await this.prismaService.profile.create({
      data: { ...data, user: { connect: { id: userId } } },
    });
  }
}
