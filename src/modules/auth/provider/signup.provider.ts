import { Injectable } from '@nestjs/common';
import { ISignup } from '../interface/signup.interface';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProvider } from 'src/modules/users/provider/create-user.provider';
import { CreateProfileProvider } from 'src/modules/profiles/provider/create-profile.provider';
import { JwtAuthPayload } from '../interface/jwt-auth-payload.interface';
import { JwtStrategies } from '../jwt.strategies';

@Injectable()
export class SignupProvider {
  constructor(
    private prismaService: PrismaService,
    private createUserProvider: CreateUserProvider,
    private createProfileProvider: CreateProfileProvider,
    private jwtStrategies: JwtStrategies,
  ) {}

  async perform(data: ISignup) {
    const signup = await this.signup(data);

    return this.sign(signup);
  }

  async signup(data: ISignup) {
    return await this.prismaService.$transaction(async () => {
      const user = await this.createUserProvider.perform({
        email: data.user.email,
        password: data.user.password,
      });

      const profile = await this.createProfileProvider.perform(
        user.id,
        data.profile,
      );

      return {
        userId: user.id,
        profileId: profile.id,
        isEmailConfirmed: user.isEmailConfirmed,
      };
    });
  }

  sign(data: JwtAuthPayload) {
    const payload: JwtAuthPayload = {
      userId: data.userId,
      profileId: data.profileId,
      isEmailConfirmed: data.isEmailConfirmed,
    };

    return this.jwtStrategies.auth.sign(payload);
  }
}
