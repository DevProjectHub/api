import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { PatchProfileDto } from './dto/patch-profile.interface';
import { PatchProfileProvider } from './provider/patch-profile.provider';
import { MeProfileProvider } from './provider/me-profile.provider';

@Controller('profiles')
export class ProfileController {
  constructor(
    private patchProfileProvider: PatchProfileProvider,
    private meProfileProvider: MeProfileProvider,
  ) {}

  @Get('me')
  async me(@Req() req: SignedRequest) {
    return await this.meProfileProvider.perform(req.user.profileId);
  }

  @Patch()
  async patchProfile(@Req() req: SignedRequest, @Body() data: PatchProfileDto) {
    return await this.patchProfileProvider.perform(req.user.profileId, data);
  }
}
