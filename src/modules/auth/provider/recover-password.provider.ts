import { Injectable } from '@nestjs/common';
import { JwtStrategies } from '../jwt.strategies';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { JwtForgetPasswordPayload } from '../interface/jwt-forget-password-payload.interface';

@Injectable()
export class RecoverPasswordProvider {
  constructor(
    private jwtStrategies: JwtStrategies,
    private prismaService: PrismaService,
  ) {}

  async perform(token: string, password: string) {
    const payload = await this.verifyToken(token);

    await this.verifyKey(payload);

    await this.updateUser(payload.email, password);
  }

  async verifyToken(token: string) {
    const verified = await this.jwtStrategies.forgetPassword.verify(token);

    if (!verified) throw AuthBusinessExceptions.invalidTokenException();

    return verified;
  }

  async verifyKey(payload: JwtForgetPasswordPayload): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: { email: payload.email, resetPasswordKey: payload.key },
    });

    if (!user) throw AuthBusinessExceptions.expiredTokenException();
  }

  async updateUser(email: string, password: string): Promise<void> {
    await this.prismaService.user.update({
      where: { email },
      data: { resetPasswordKey: null, password },
    });
  }
}
