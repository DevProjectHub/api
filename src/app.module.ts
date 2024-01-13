import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [AuthModule, ProfileModule, UserModule, ProjectsModule],
  controllers: [AppController],
})
export class AppModule {}
