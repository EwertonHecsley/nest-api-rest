/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import PrismaService from 'src/database/PrismaService';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService]
})
export class UserModule { }
