import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { CreateProfileProvider } from './provider/create-profile.provider';
import { PatchProfileProvider } from './provider/patch-profile.provider';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [CreateProfileProvider, PatchProfileProvider],
  exports: [CreateProfileProvider],
})
export class ProfileModule {}
