import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResultDto } from 'src/dto/login-result.dto';
import { LoginFormDto } from 'src/dto/login.form.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/services/user.service';

@Controller()
export class AuthController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ){}

    @(
        ApiResponse({type: LoginResultDto}),
        ApiResponse({status: 400}),
        ApiResponse({status: 401})
    )
    @Post('login')
    async login(@Body() body: LoginFormDto) {
        const user = await this.userService.findByUsernameOrEmail(body.usernameOrEmail, body.usernameOrEmail);
        if(!await bcrypt.compare(body.password, user.password)) {
            throw new UnauthorizedException();
        }
        return new LoginResultDto(
            await this.jwtService.signAsync({ 
                id: user.id,
                username: user.username,
                email: user.email,
            }),
            user
        );
    }
}
