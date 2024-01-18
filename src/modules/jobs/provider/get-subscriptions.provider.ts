import { PrismaService } from 'prisma/prisma.service';
import { IGetSubscriptionsPerformResult } from '../interface/get-subscriptions.interface';
import { Injectable } from '@nestjs/common';
import { ProjectBusinessExceptions } from 'src/shared/exceptions/project.exception';

@Injectable()
export class GetSubscriptionsProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string): Promise<IGetSubscriptionsPerformResult[]> {
    await this.validation(projectId);

    return await this.subscriptions(projectId);
  }

  private async validation(projectId: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) throw ProjectBusinessExceptions.projectNotFoundException();
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
