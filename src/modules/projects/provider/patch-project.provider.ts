import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IPatchProject } from '../interface/update-project.interface';
import { Project } from '@prisma/client';

@Injectable()
export class PatchProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string, data: IPatchProject): Promise<Project> {
    await this.preValidation(projectId);

    return await this.patchProject(projectId, data);
  }

  private async preValidation(projectId: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) throw new Error('Project not found');
  }

  private async patchProject(
    projectId: string,
    data: IPatchProject,
  ): Promise<Project> {
    return await this.prismaService.project.update({
      where: { id: projectId },
      data,
    });
  }
}
