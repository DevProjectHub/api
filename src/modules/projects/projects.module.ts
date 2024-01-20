import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { CreateProjectProvider } from './provider/create-project.provider';
import { GetMyProjectsProvider } from './provider/get-my-projects.provider';
import { SearchProjectProvider } from './provider/search-project.provider';
import { GetProjectProvider } from './provider/get-project.provider';
import { PatchProjectProvider } from './provider/patch-project.provider';
import { DismissProjectProvider } from './provider/dismiss-project.provider';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [
    CreateProjectProvider,
    GetMyProjectsProvider,
    GetProjectProvider,
    SearchProjectProvider,
    PatchProjectProvider,
    DismissProjectProvider,
  ],
})
export class ProjectsModule {}
