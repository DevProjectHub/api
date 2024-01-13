import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.profileService.getProfile(id);
  }
}
