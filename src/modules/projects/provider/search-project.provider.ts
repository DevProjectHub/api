import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IFilter } from 'src/shared/interface/filter.interface';
import { IPagination } from 'src/shared/interface/pagination.interface';
import { ISearchProject } from '../interface/search-project.interface';

@Injectable()
export class SearchProjectProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(
    pagination: IPagination,
    filter: IFilter,
  ): Promise<ISearchProject> {
    return await this.searchProject(pagination, filter);
  }

  async searchProject(
    pagination: IPagination,
    filter: IFilter,
  ): Promise<ISearchProject> {
    return await this.prismaService.project.findMany({
      where: {
        name: { contains: filter.name },
        jobVacancies: filter.openJobVacancies
          ? { every: { role: { contains: filter.role } } }
          : { none: {} },
      },
      include: { jobVacancies: true },
      orderBy: { [pagination.field]: pagination.order },
      skip: pagination.skip,
      take: pagination.limit,
    });
  }
}
