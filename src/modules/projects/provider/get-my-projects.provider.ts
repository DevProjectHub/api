import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IGetMyProjects } from '../interface/get-my-projects.interface';

@Injectable()
export class GetMyProjectsProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(profileId: string): Promise<IGetMyProjects> {
    return await this.getMyProjects(profileId);
  }

  private async getMyProjects(userId: string): Promise<IGetMyProjects> {
    return await this.prismaService.project.findMany({
      where: { members: { some: { profile: { userId } } } },
      include: { owner: true },
    });
  }
}
