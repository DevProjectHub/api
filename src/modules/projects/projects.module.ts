import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
