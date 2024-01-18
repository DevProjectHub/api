import { Injectable } from '@nestjs/common';
import { GetUserByEmailProvider } from 'src/modules/users/provider/get-user-by-email.provider';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { HashUtil } from 'src/utils/hash.util';
import { JwtAuthPayload } from '../interface/jwt-auth-payload.interface';
import { JwtStrategies } from '../jwt.strategies';
import { ILogin } from '../interface/login.interface';
import { IGetUserByEmail } from 'src/modules/users/interface/get-user-by-email.interface';

@Injectable()
export class LoginProvider {
  constructor(
    private getUserByEmailProvider: GetUserByEmailProvider,
    private jwtStrategies: JwtStrategies,
  ) {}

  async perform(data: ILogin) {
    const user = await this.validation(data);

    return this.sign(user);
  }

  async validation(data: ILogin): Promise<IGetUserByEmail> {
    const user = await this.getUserByEmailProvider.perform(data.email);

    if (!user) throw AuthBusinessExceptions.invalidCredentialsException();

    const isValidPassword = HashUtil.verify(data.password, user.password);

    if (!isValidPassword)
      throw AuthBusinessExceptions.invalidCredentialsException();

    if (!user.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }

    return user;
  }

  async sign(user: IGetUserByEmail) {
    const payload: JwtAuthPayload = {
      userId: user.id,
      profileId: user.profile.id,
      isEmailConfirmed: user.isEmailConfirmed,
    };

    return await this.jwtStrategies.auth.sign(payload);
  }
}
