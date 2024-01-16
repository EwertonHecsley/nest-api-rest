/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
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
        if (!response) return res.status(HttpStatus.NOT_FOUND).json({ mensagem: 'Usuário não encontrado.' });

        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.OK).json(responseFormated);
    }

    @Post()
    async createUser(@Body() user: UserDto, @Res() res: Response) {
        const emailExist = await this.userService.getUserByEmail(user.email);
        if (emailExist) return res.status(HttpStatus.BAD_REQUEST).json({ mensagem: 'Email já cadastrado.' });

        const response = await this.userService.createUser(user);
        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: responseFormated });
    }
}
