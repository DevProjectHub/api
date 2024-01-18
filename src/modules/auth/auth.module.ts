import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtStrategies } from './jwt.strategies';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ProfileModule } from '../profiles/profile.module';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginProvider } from './provider/login.provider';
import { SignupProvider } from './provider/signup.provider';
import { ForgetPasswordProvider } from './provider/forget-password.provider';
import { RecoverPasswordProvider } from './provider/recover-password.provider';

@Module({
  imports: [PrismaModule, JwtModule, UserModule, ProfileModule],
  controllers: [AuthController],
  providers: [
    LoginProvider,
    SignupProvider,
    ForgetPasswordProvider,
    RecoverPasswordProvider,
    JwtStrategies,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
