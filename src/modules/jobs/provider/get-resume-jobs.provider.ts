import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IGetResumeJobs } from 'src/modules/projects/interface/get-resume-projects.provider';

@Injectable()
export class GetJobsResumeProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(): Promise<IGetResumeJobs[]> {
    return await this.getProjectsResume();
  }

  private async getProjectsResume(): Promise<IGetResumeJobs[]> {
    return await this.prismaService.jobVacancy.findMany({
      take: 10,
      include: { requirements: true },
    });
  }
}
