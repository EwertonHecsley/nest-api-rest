/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthUserDto } from './dtos/auth.dto';

@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post()
    async login(@Body() userLogin: AuthUserDto, @Res() res: Response) {
        const user = await this.authService.login(userLogin.email, userLogin.password);

        return res.status(HttpStatus.OK).json({ mensagem: 'Usuário logado com sucesso.', usuario: user.user, token: user.token });
    }
}
