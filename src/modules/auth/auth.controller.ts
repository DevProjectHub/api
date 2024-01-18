import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/constants/public.constant';
import { LoginProvider } from './provider/login.provider';
import { SignupProvider } from './provider/signup.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private loginProvider: LoginProvider,
    private signupProvider: SignupProvider,
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
}
