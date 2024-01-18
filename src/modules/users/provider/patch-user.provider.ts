import { Injectable } from '@nestjs/common';
import { IPatchUser } from '../interface/patch-user.interface';
import { PrismaService } from 'prisma/prisma.service';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';

@Injectable()
export class PatchUserProvider {
  constructor(private prismaService: PrismaService) {}

  async perform(id: string, data: IPatchUser) {
    await this.validation(id);

    await this.patchUser(id, data);
  }

  private async validation(id: string) {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    if (!user) throw AuthBusinessExceptions.userNotFoundException();
  }

  private async patchUser(id: string, data: IPatchUser) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
