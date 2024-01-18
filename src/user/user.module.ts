/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import PrismaService from 'src/database/PrismaService';
import HashPassword from './services/HashPassword';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService, HashPassword],
    exports: [UserService]
})
export class UserModule { }
