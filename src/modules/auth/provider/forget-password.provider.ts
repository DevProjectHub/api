import { Injectable } from '@nestjs/common';
import { GetResetPasswordKeyProvider } from 'src/modules/users/provider/get-reset-password-key.provider';
import { GetUserByEmailProvider } from 'src/modules/users/provider/get-user-by-email.provider';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { JwtStrategies } from '../jwt.strategies';

@Injectable()
export class ForgetPasswordProvider {
  constructor(
    private getUserByEmailProvider: GetUserByEmailProvider,
    private getResetPasswordKeyProvider: GetResetPasswordKeyProvider,
    private jwtStrategies: JwtStrategies,
  ) {}

  async perform(email: string): Promise<void> {
    await this.getUserByEmailProvider.perform(email);

    const key = await this.getResetPasswordKeyProvider.perform(email);

    await this.jwtStrategies.forgetPassword.sign({ email, key });

    this.triggerEmail();
  }

  async triggerEmail(): Promise<void> {} //implement this later
}
