import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginusers.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    return {
      message: 'Login exitoso',
      user: user, // Este objeto 'user' ahora contendrá el campo 'role'
    };
  }
}
