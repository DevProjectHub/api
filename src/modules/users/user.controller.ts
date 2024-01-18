import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GetUserProvider } from './provider/get-user.provider';
import { PatchUserProvider } from './provider/patch-user.provider';
import { PatchUserDto } from './dto/patch-user.dto';

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

  @Patch(':id')
  async patchUser(@Param('id') id: string, @Body() data: PatchUserDto) {
    return await this.patchUserProvider.perform(id, data);
  }
}
