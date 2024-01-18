import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateProject } from '../interface/create-project.interface';
import { Project } from '@prisma/client';
import { ProjectBusinessExceptions } from 'src/shared/exceptions/project.exception';

@Injectable()
export class CreateProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(data: ICreateProject, ownerId: string): Promise<Project> {
    await this.validation(data.name);

    return await this.createProject(data, ownerId);
  }

  private async createProject(
    data: ICreateProject,
    profileId: string,
  ): Promise<Project> {
    return await this.prismaService.project.create({
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo ?? null,
        owner: { connect: { id: profileId } },
        members: {
          create: {
            role: data.ownerRole,
            profile: { connect: { userId: profileId } },
            description: `Fundador do projeto ${data.name}`,
          },
        },
      },
    });
  }

  private async validation(name: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { name },
    });

    if (project)
      throw ProjectBusinessExceptions.projectAlreadyRegisteredException();
  }
}
