import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RefuseCandidateProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(jobSubscriptionId: string): Promise<void> {
    await this.validation(jobSubscriptionId);

    await this.refuseCandidate(jobSubscriptionId);
  }

  private async validation(jobSubscriptionId: string): Promise<void> {
    const jobSubscription = await this.prismaService.jobSubscription.findFirst({
      where: { id: jobSubscriptionId },
      select: { id: true },
    });

    if (!jobSubscription) throw new Error('Job subscription not found');
  }

  private async refuseCandidate(jobSubscriptionId: string): Promise<void> {
    await this.prismaService.jobSubscription.delete({
      where: {
        id: jobSubscriptionId,
      },
    });
  }
}
