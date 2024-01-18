import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DismissProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string, profileId: string): Promise<void> {
    const projectProfileId = await this.validation(projectId, profileId);

    await this.dismissProject(projectProfileId);
  }

  private async validation(
    projectId: string,
    profileId: string,
  ): Promise<string> {
    const projectProfile = await this.prismaService.projectProfile.findFirst({
      where: { profileId, projectId },
      select: { id: true },
    });

    if (!projectProfile) throw new Error('Você não faz parte desse projeto');

    return projectProfile.id;
  }

  private async dismissProject(projectProfileId: string): Promise<void> {
    await this.prismaService.projectProfile.delete({
      where: { id: projectProfileId },
    });
  }
}
