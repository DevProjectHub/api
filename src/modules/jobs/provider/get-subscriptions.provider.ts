import { PrismaService } from 'prisma/prisma.service';
import { IGetSubscriptionsPerformResult } from '../interface/get-subscriptions.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetSubscriptionsProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string): Promise<IGetSubscriptionsPerformResult[]> {
    await this.preValidation(projectId);

    return await this.subscriptions(projectId);
  }

  private async preValidation(projectId: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) throw new Error('Project not found');
  }

  private async subscriptions(
    projectId: string,
  ): Promise<IGetSubscriptionsPerformResult[]> {
    return await this.prismaService.jobVacancy.findMany({
      where: { projectId },
      include: {
        requirements: true,
        jobSubscriptions: {
          include: { profile: true, requirementAnswers: true },
        },
      },
    });
  }
}
