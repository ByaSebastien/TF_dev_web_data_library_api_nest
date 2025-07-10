import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { LoginResultDto } from '../dtos/login-result.dto';
import { LoginFormDto } from '../dtos/login.form.dto';
import { RegisterFormDto } from '../dtos/register.form.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @(ApiResponse({ type: LoginResultDto }),
  ApiResponse({ status: 400 }),
  ApiResponse({ status: 401 }))
  @Post('register')
  async register(@Body() body: RegisterFormDto) {
    const user = await this.authService.register(body.toUser());
    return new LoginResultDto(
      await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
      user,
    );
  }

  @(ApiResponse({ type: LoginResultDto }),
  ApiResponse({ status: 400 }),
  ApiResponse({ status: 401 }))
  @Post('login')
  async login(@Body() body: LoginFormDto) {
    const user = await this.authService.login(body.email, body.password);
    return new LoginResultDto(
      await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
      user,
    );
  }
}
