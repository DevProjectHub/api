import { PrismaService } from 'prisma/prisma.service';
import { ISubscribeJob } from '../interface/subscribe-job.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribeJobProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(
    jobVacancyId: string,
    profileId: string,
    requirementAnswers: ISubscribeJob[],
  ) {
    await this.preValidation(jobVacancyId, profileId);

    await this.subscribe(jobVacancyId, profileId, requirementAnswers);
  }

  private async preValidation(
    jobVacancyId: string,
    profileId: string,
  ): Promise<void> {
    const jobVacancy = await this.prismaService.jobVacancy.findFirst({
      where: { id: jobVacancyId },
      select: { id: true },
    });

    if (!jobVacancy) throw new Error('Job vacancy not found');

    const jobSubscription = await this.prismaService.jobSubscription.findFirst({
      where: { jobVacancyId, profileId },
      select: { id: true },
    });

    if (jobSubscription) throw new Error('You already subscribed to this job');
  }

  private async subscribe(
    jobVacancyId: string,
    profileId: string,
    requirementAnswers: ISubscribeJob[],
  ) {
    return await this.prismaService.jobSubscription.create({
      data: {
        profileId,
        jobVacancyId,
        requirementAnswers: {
          createMany: { data: requirementAnswers },
        },
      },
    });
  }
}
