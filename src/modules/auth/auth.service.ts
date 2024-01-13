import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ProfileService } from '../profiles/profile.service';
import { PrismaService } from 'prisma/prisma.service';
import { ISignup } from './interface/signup.interface';
import { ILogin } from './interface/login.interface';
import { AuthBusinessExceptions } from 'src/shared/exceptions/auth.exceptions';
import { HashUtil } from 'src/utils/hash.util';
import { JwtStrategies } from './jwt.strategies';
import { JwtAuthPayload } from './interface/jwt-auth-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private profileService: ProfileService,
    private jwtStrategies: JwtStrategies,
  ) {}
  async login(data: ILogin) {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) throw AuthBusinessExceptions.invalidCredentialsException();

    const isValidPassword = HashUtil.verify(data.password, user.password);

    if (!isValidPassword)
      throw AuthBusinessExceptions.invalidCredentialsException();

    if (!user.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }

    const payload: JwtAuthPayload = {
      userId: user.id,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
    };

    return await this.jwtStrategies.auth.sign(payload);
  }

  async signUp(data: ISignup) {
    const password = HashUtil.hash(data.user.password);

    // const { accessToken } = await this.jwtStrategies.mail.sign({
    //   email: data.email,
    // });

    const user = await this.prismaService.$transaction(async () => {
      const user = await this.userService.createUser({
        email: data.user.email,
        password,
      });

      await this.profileService.createProfile(user.id, data.profile);

      return user;
    });

    // await this.mailService.sendConfirmationEmail(
    //   createdUser.email,
    //   createdUser.firstName,
    //   accessToken,
    // );

    //jwt

    const payload: JwtAuthPayload = {
      userId: user.id,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
    };

    return this.jwtStrategies.auth.sign(payload);
  }
}
