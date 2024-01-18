/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import PrismaService from 'src/database/PrismaService';
import { UserDto } from './dtos/user.dto';
import HashPassword from './services/HashPassword';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private hashService: HashPassword) { }

    public async createUser(user: UserDto) {

        const hashPassword = await this.hashService.hashPassword(user.password);
        return await this.prismaService.prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword
            }
        })
    };

    public async getAllUsers() {
        return await this.prismaService.prisma.users.findMany();
    };

    public async getUserByEmail(email: string): Promise<UserDto> {
        return await this.prismaService.prisma.users.findFirst({ where: { email } });
    }


    public async getUserById(id: number): Promise<UserDto> {
        return await this.prismaService.prisma.users.findUnique({ where: { id } });
    };

    public async deleteUserById(id: number): Promise<UserDto> {
        return await this.prismaService.prisma.users.delete({ where: { id } });
    };

    public async updateUser(user: UserDto, id: number): Promise<UserDto> {
        return await this.prismaService.prisma.users.update({
            where: {
                id
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    };
}
