import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ISignup } from './interface/signup.interface';
import { ILogin } from './interface/login.interface';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { HashUtil } from 'src/utils/hash.util';
import { JwtStrategies } from './jwt.strategies';
import { JwtAuthPayload } from './interface/jwt-auth-payload.interface';
import { CreateUserProvider } from '../users/provider/create-user.provider';
import { GetUserByEmailProvider } from '../users/provider/get-user-by-email.provider';
import { CreateProfileProvider } from '../profiles/provider/create-profile.provider';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtStrategies: JwtStrategies,
    private getUserByEmailProvider: GetUserByEmailProvider,
    private createUserProvider: CreateUserProvider,
    private createProfileProvider: CreateProfileProvider,
  ) {}
  async login(data: ILogin) {
    const user = await this.getUserByEmailProvider.perform(data.email);

    if (!user) throw AuthBusinessExceptions.invalidCredentialsException();

    const isValidPassword = HashUtil.verify(data.password, user.password);

    if (!isValidPassword)
      throw AuthBusinessExceptions.invalidCredentialsException();

    if (!user.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }

    const payload: JwtAuthPayload = {
      userId: user.id,
      profileId: user.profile.id,
      isEmailConfirmed: user.isEmailConfirmed,
    };

    return await this.jwtStrategies.auth.sign(payload);
  }

  async signUp(data: ISignup) {
    const password = HashUtil.hash(data.user.password);

    // const { accessToken } = await this.jwtStrategies.mail.sign({
    //   email: data.email,
    // });

    const { user, profile } = await this.prismaService.$transaction(
      async () => {
        const user = await this.createUserProvider.perform({
          email: data.user.email,
          password,
        });

        const profile = await this.createProfileProvider.perform(
          user.id,
          data.profile,
        );

        return { user, profile };
      },
    );

    // await this.mailService.sendConfirmationEmail(
    //   createdUser.email,
    //   createdUser.firstName,
    //   accessToken,
    // );

    const payload: JwtAuthPayload = {
      userId: user.id,
      profileId: profile.id,
      isEmailConfirmed: user.isEmailConfirmed,
    };

    return this.jwtStrategies.auth.sign(payload);
  }
}
