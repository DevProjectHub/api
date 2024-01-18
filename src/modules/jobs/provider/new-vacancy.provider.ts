import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { INewJobVacancy } from '../interface/new-vacancy.interface';

@Injectable()
export class NewJobVacancyProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(data: INewJobVacancy): Promise<void> {
    await this.validation(data.projectId);

    await this.newJobVacancy(data);
  }

  private async validation(projectId: string): Promise<void> {
    const project = await this.prismaService.project.findFirst({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) throw new Error('Project not found');
  }

  private async newJobVacancy(data: INewJobVacancy): Promise<void> {
    //melhorar tipo resposta
    await this.prismaService.project.update({
      where: { id: data.projectId },
      data: {
        jobVacancies: {
          create: {
            description: data.description,
            role: data.role,
            requirements: {
              createMany: {
                data: data.requirements.map((require) => ({ require })),
              },
            },
          },
        },
      },
    });
  }
}
