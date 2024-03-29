import { PrismaService } from 'prisma/prisma.service';
import { ISubscribeJob } from '../interface/subscribe-job.interface';
import { Injectable } from '@nestjs/common';
import { JobBusinessExceptions } from 'src/shared/exceptions/job.exceptions';

@Injectable()
export class SubscribeJobProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(
    jobVacancyId: string,
    profileId: string,
    requirementAnswers: ISubscribeJob[],
  ) {
    await this.validation(jobVacancyId, profileId);

    await this.subscribe(jobVacancyId, profileId, requirementAnswers);
  }

  private async validation(
    jobVacancyId: string,
    profileId: string,
  ): Promise<void> {
    const jobVacancy = await this.prismaService.jobVacancy.findFirst({
      where: { id: jobVacancyId },
      select: { id: true },
    });

    if (!jobVacancy) throw JobBusinessExceptions.jobNotFoundException();

    const jobSubscription = await this.prismaService.jobSubscription.findFirst({
      where: { jobVacancyId, profileId },
      select: { id: true },
    });

    if (jobSubscription)
      throw JobBusinessExceptions.jobSubscriptionNotFoundException();
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
