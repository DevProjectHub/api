import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IUpdateProject } from './interface/update-project.interface';
import { ICreateProject } from './interface/create-project.interface';
import { IAddMember } from './interface/add-member.interface';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async getProject(id: string) {
    return await this.prismaService.project.findFirst({ where: { id } });
  }

  async getProjects() {
    return await this.prismaService.project.findMany();
  }

  async createProject(data: ICreateProject, founderId: string) {
    return await this.prismaService.project.create({
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo ?? null,
        founder: { connect: { userId: founderId } },
        members: {
          create: {
            role: data.founderRole,
            profile: { connect: { userId: founderId } },
          },
        },
      },
    });
  }

  async addMember(id: string, data: IAddMember) {
    return await this.prismaService.project.update({
      where: { id },
      data: {
        members: {
          create: {
            role: data.role,
            profile: { connect: { userId: data.userId } },
          },
        },
      },
    });
  }

  async updateProject(id: string, data: IUpdateProject) {
    return await this.prismaService.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string) {
    return await this.prismaService.project.delete({ where: { id } });
  }
}
