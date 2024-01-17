/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async listAllUsers(@Res() res: Response) {
        const response = await this.userService.getAllUsers();
        const responseFormated = response.map((user) => {
            const { password: _, createdAt: __, ...result } = user;
            return result
        })
        return res.status(HttpStatus.OK).json(responseFormated);
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number, @Res() res: Response) {
        const response = await this.userService.getUserById(Number(id));
        if (!response) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.OK).json(responseFormated);
    }

    @Post()
    async createUser(@Body() user: UserDto, @Res() res: Response) {
        const emailExist = await this.userService.getUserByEmail(user.email);
        if (emailExist) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const response = await this.userService.createUser(user);
        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: responseFormated });
    }
}
