import { Body, Controller, Post, Query } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/constants/public.constant';
import { LoginProvider } from './provider/login.provider';
import { SignupProvider } from './provider/signup.provider';
import { ForgetPasswordProvider } from './provider/forget-password.provider';
import { ForgetPasswordDto } from './dto/forget-password.provider';
import { RecoverPasswordProvider } from './provider/recover-password.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private loginProvider: LoginProvider,
    private signupProvider: SignupProvider,
    private forgetPasswordProvider: ForgetPasswordProvider,
    private recoverPasswordProvider: RecoverPasswordProvider,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.loginProvider.perform(data);
  }

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.signupProvider.perform(data);
  }

  @Public()
  @Post('forget')
  async forgetPassword(@Body() data: ForgetPasswordDto) {
    return await this.forgetPasswordProvider.perform(data.email);
  }

  @Post('recover')
  async recoverPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    return await this.recoverPasswordProvider.perform(token, password);
  }
}
