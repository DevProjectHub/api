import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateProfile } from './interface/create-profile';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async getProfile(id: string) {
    return await this.prismaService.profile.findFirst({ where: { id } });
  }

  async createProfile(userId: string, data: ICreateProfile) {
    return await this.prismaService.profile.create({
      data: { user: { connect: { id: userId } }, ...data },
    });
  }
}
