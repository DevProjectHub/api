import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { CreateUserProvider } from './provider/create-user.provider';
import { GetUserByEmailProvider } from './provider/get-user-by-email.provider';
import { GetUserProvider } from './provider/get-user.provider';
import { PatchUserProvider } from './provider/patch-user.provider';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserProvider,
    GetUserByEmailProvider,
    GetUserProvider,
    PatchUserProvider,
  ],
  exports: [GetUserByEmailProvider, CreateUserProvider],
})
export class UserModule {}
