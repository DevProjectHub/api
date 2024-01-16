import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IGetProject } from '../interface/get-project.interface';

@Injectable()
export class GetProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(projectId: string): Promise<IGetProject> {
    const project = await this.getProject(projectId);

    return this.postValidation(project);
  }

  private async getProject(projectId: string): Promise<IGetProject> {
    return await this.prismaService.project.findFirst({
      where: { id: projectId },
      include: {
        owner: true,
        jobVacancies: true,
        members: { include: { profile: true } },
      },
    });
  }

  private postValidation<T>(project: T): T {
    if (!project) throw new Error('Projeto não encontrado');

    return project;
  }
}
