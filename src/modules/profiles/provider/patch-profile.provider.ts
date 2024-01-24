import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IPatchProfile } from '../interface/patch-profile.interface';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';

@Injectable()
export class PatchProfileProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(
    profileId: string,
    data: IPatchProfile,
  ): Promise<IPatchProfile> {
    await this.validation(profileId);

    return await this.patchProfile(profileId, data);
  }

  private async validation(profileId: string): Promise<void> {
    const profile = await this.prismaService.profile.findFirst({
      where: { id: profileId },
      select: { id: true },
    });

    if (!profile) throw AuthBusinessExceptions.profileNotFoundException();
  }

  private async patchProfile(
    profileId: string,
    data: IPatchProfile,
  ): Promise<IPatchProfile> {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data,
    });
  }
}
