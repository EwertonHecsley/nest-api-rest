/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import HashPassword from 'src/user/services/HashPassword';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private hashPasswordService: HashPassword,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new HttpException('Usuário não encontrado', HttpStatus.UNAUTHORIZED);

        const verifyHash = await this.hashPasswordService.compareHashPassword(password, user.password);
        if (!verifyHash) throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);

        const token = await this.jwtService.signAsync({ email: user.email });

        return {
            user,
            token
        }
    }
}
