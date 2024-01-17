/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
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

    @Post()
    async createUser(@Body() user: UserDto, @Res() res: Response) {
        const emailExist = await this.userService.getUserByEmail(user.email);
        if (emailExist) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const response = await this.userService.createUser(user);
        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: responseFormated });
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number, @Res() res: Response) {
        const response = await this.userService.getUserById(Number(id));
        if (!response) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        await this.userService.deleteUserById(Number(id));
        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Put('/:id')
    async updateUSer(@Param('id') id: number, @Body() user: UserDto, @Res() res: Response) {
        const userExist = await this.userService.getUserById(Number(id));
        if (!userExist) throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);

        const emailExist = await this.userService.getUserByEmail(user.email);
        if (emailExist) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        await this.userService.updateUser(user, Number(id));
        return res.status(HttpStatus.NO_CONTENT).send();
    }
}
