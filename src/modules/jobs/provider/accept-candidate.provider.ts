import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

interface IPreValidation {
  profileId: string;
  jobVacancy: { role: string; projectId: string; id: string };
}
@Injectable()
export class AcceptCandidateProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(jobSubscriptionId: string): Promise<void> {
    const jobSubscription = await this.preValidation(jobSubscriptionId);

    this.acceptCandidate(jobSubscription);
  }

  private async preValidation(
    jobSubscriptionId: string,
  ): Promise<IPreValidation> {
    const jobSubscription = await this.prismaService.jobSubscription.findFirst({
      where: { id: jobSubscriptionId },
      select: {
        profileId: true,
        jobVacancy: { select: { role: true, projectId: true, id: true } },
      },
    });

    if (!jobSubscription) throw new Error('Job subscription not found');

    return jobSubscription;
  }

  private async acceptCandidate(
    jobSubscription: IPreValidation,
  ): Promise<void> {
    await this.prismaService.project.update({
      where: { id: jobSubscription.jobVacancy.projectId },
      data: {
        members: {
          create: {
            profileId: jobSubscription.profileId,
            role: jobSubscription.jobVacancy.role,
          },
        },
        jobVacancies: {
          delete: { id: jobSubscription.jobVacancy.id },
        },
      },
    });
  }
}
