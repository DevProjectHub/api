import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IPatchProject } from '../interface/update-project.interface';
import { Project } from '@prisma/client';
import { ProjectBusinessExceptions } from 'src/shared/exceptions/project.exception';

@Injectable()
export class PatchProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string, data: IPatchProject): Promise<Project> {
    await this.validation(projectId);

    return await this.patchProject(projectId, data);
  }

  private async validation(projectId: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) throw ProjectBusinessExceptions.projectNotFoundException();
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
