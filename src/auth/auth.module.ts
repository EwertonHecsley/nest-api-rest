/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import HashPassword from 'src/user/services/HashPassword';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: 'minhaChave',
        signOptions: { expiresIn: '1h' }
    })],
    controllers: [AuthController],
    providers: [AuthService, HashPassword, JwtService]
})
export class AuthModule { }
