import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategies } from './jwt.strategies';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ProfileModule } from '../profiles/profile.module';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule, UserModule, ProfileModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategies,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
