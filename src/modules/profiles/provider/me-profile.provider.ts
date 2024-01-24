import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { IMeProfile } from '../interface/me-profile.interface';

@Injectable()
export class MeProfileProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(profileId: string): Promise<IMeProfile> {
    const profile = await this.validation(profileId);

    return profile;
  }

  private async validation(profileId: string): Promise<IMeProfile> {
    const profile = await this.prismaService.profile.findFirst({
      where: { id: profileId },
      select: { id: true, name: true, photo: true },
    });

    if (!profile) throw AuthBusinessExceptions.profileNotFoundException();

    return profile;
  }
}
