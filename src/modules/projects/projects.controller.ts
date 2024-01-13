import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ICreateProject } from './interface/create-project.interface';
import { IUpdateProject } from './interface/update-project.interface';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return await this.projectsService.getProject(id);
  }

  @Get()
  async getProjects() {
    return await this.projectsService.getProjects();
  }

  @Post()
  async createProject(
    @Body() data: CreateProjectDto,
    @Req() req: SignedRequest,
  ) {
    return await this.projectsService.createProject(data, req.user.userId);
  }

  @Patch(':id/add-member')
  async addMember(@Param('id') id: string, @Body() data: AddMemberDto) {
    return await this.projectsService.addMember(id, data);
  }

  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() data: IUpdateProject) {
    return await this.projectsService.updateProject(id, data);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
