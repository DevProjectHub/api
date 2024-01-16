import { Body, Controller, Patch, Req } from '@nestjs/common';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { PatchProfileDto } from './dto/patch-profile.interface';
import { PatchProfileProvider } from './provider/patch-profile.provider';

@Controller('profiles')
export class ProfileController {
  constructor(private patchProfileProvider: PatchProfileProvider) {}

  @Patch()
  async patchProfile(@Req() req: SignedRequest, @Body() data: PatchProfileDto) {
    return await this.patchProfileProvider.perform(req.user.profileId, data);
  }
}
