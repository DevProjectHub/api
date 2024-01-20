import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { PatchProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationPipe } from 'src/shared/pipe/pagination.pipe';
import { FilterPipe } from 'src/shared/pipe/filter.pipe';
import { FilterDto } from 'src/shared/dto/filter.dto';
import { CreateProjectProvider } from './provider/create-project.provider';
import { GetMyProjectsProvider } from './provider/get-my-projects.provider';
import { GetProjectProvider } from './provider/get-project.provider';
import { PatchProjectProvider } from './provider/patch-project.provider';
import { SearchProjectProvider } from './provider/search-project.provider';
import { DismissProjectProvider } from './provider/dismiss-project.provider';

@Controller('projects')
export class ProjectsController {
  constructor(
    private createProjectProvider: CreateProjectProvider,
    private getMyProjectsProvider: GetMyProjectsProvider,
    private getProjectProvider: GetProjectProvider,
    private searchProjectProvider: SearchProjectProvider,
    private patchProjectProvider: PatchProjectProvider,
    private dismissProjectProvider: DismissProjectProvider,
  ) {}

  @Get('projectId/:projectId')
  async getProject(@Param('projectId') projectId: string) {
    return await this.getProjectProvider.perform(projectId);
  }

  @Get('my')
  async getMyProjects(@Req() req: SignedRequest) {
    return await this.getMyProjectsProvider.perform(req.user.userId);
  }

  @Get('search')
  async searchProject(
    @Query(PaginationPipe) pagination: PaginationDto,
    @Query(FilterPipe) filter: FilterDto,
  ) {
    return await this.searchProjectProvider.searchProject(pagination, filter);
  }

  @Post()
  async createProject(
    @Body() data: CreateProjectDto,
    @Req() req: SignedRequest,
  ) {
    return await this.createProjectProvider.perform(data, req.user.profileId);
  }

  @Patch('projectId/:projectId')
  async patchProject(
    @Param('projectId') projectId: string,
    @Body() data: PatchProjectDto,
  ) {
    return await this.patchProjectProvider.perform(projectId, data);
  }

  @Patch('dismiss/:projectId')
  async dismissProject(
    @Param('projectId') projectId: string,
    @Req() req: SignedRequest,
  ) {
    return await this.dismissProjectProvider.perform(
      projectId,
      req.user.profileId,
    );
  }
}
