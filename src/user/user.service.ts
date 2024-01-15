/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import PrismaService from 'src/database/PrismaService';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    public async createUser(user: UserDto) {
        return await this.prismaService.prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    };

    public async getAllUsers() {
        return await this.prismaService.prisma.users.findMany();
    }
}
