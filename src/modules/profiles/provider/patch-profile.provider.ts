import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IPatchProfile } from '../interface/patch-profile.interface';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';

@Injectable()
export class PatchProfileProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(userId: string, data: IPatchProfile): Promise<IPatchProfile> {
    await this.validation(userId);

    return await this.patchProfile(userId, data);
  }

  private async validation(userId: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      select: { profile: { select: { id: true } } },
    });

    if (!user?.profile?.id)
      throw AuthBusinessExceptions.userNotFoundException();
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
