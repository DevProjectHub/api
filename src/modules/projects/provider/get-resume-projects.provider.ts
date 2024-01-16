import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GetProjectsResumeProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(): Promise<Project[]> {
    return await this.getProjectsResume();
  }

  private async getProjectsResume(): Promise<Project[]> {
    return await this.prismaService.project.findMany({
      distinct: ['id'],
      where: {
        jobVacancies: { some: {} },
      },
      take: 10,
    });
  }
}
