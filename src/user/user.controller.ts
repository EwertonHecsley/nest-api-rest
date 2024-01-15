/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async listAllUsers(@Res() res: Response) {
        const response = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json(response);
    }

    @Post()
    async createUser(@Body() user: UserDto, @Res() res: Response) {
        const response = await this.userService.createUser(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...responseFormated } = response;
        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: responseFormated });
    }
}
