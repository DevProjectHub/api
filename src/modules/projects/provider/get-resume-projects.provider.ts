import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IGetResumeProjects } from '../interface/get-resume-projects.provider';

@Injectable()
export class GetProjectsResumeProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(): Promise<IGetResumeProjects[]> {
    return await this.getProjectsResume();
  }

  private async getProjectsResume(): Promise<IGetResumeProjects[]> {
    return await this.prismaService.jobVacancy.findMany({
      take: 10,
      include: { requirements: true },
    });
  }
}
