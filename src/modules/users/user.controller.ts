import { Controller, Get, Param } from '@nestjs/common';
import { GetUserProvider } from './provider/get-user.provider';
import { PatchUserProvider } from './provider/patch-user.provider';

@Controller('users')
export class UserController {
  constructor(
    private getUserProvider: GetUserProvider,
    private patchUserProvider: PatchUserProvider,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserProvider.perform(id);
  }
}
