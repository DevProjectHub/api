import { GetSpecificSubscriptionPerformResult } from '../interface/get-specific-subscription.provider';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JobBusinessExceptions } from 'src/shared/exceptions/job.exceptions';
@Injectable()
export class GetSpecificSubscriptionProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(
    jobSubscriptionId: string,
  ): Promise<GetSpecificSubscriptionPerformResult> {
    const jobSubscription = await this.specificSubscription(jobSubscriptionId);

    return this.postValidation<GetSpecificSubscriptionPerformResult>(
      jobSubscription,
    );
  }

  private async specificSubscription(jobSubscriptionId: string) {
    return await this.prismaService.jobSubscription.findFirst({
      where: { id: jobSubscriptionId },
      include: { profile: true, jobVacancy: true, requirementAnswers: true },
    });
  }

  private postValidation<T>(jobSubscription: T): T {
    if (!jobSubscription)
      throw JobBusinessExceptions.jobSubscriptionNotFoundException();

    return jobSubscription;
  }
}
