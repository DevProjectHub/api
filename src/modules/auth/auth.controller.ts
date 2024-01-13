import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/constants/public.constant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.authService.signUp(data);
  }
}
