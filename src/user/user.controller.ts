/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    listAllUsers() {
        return 'Listar Todos os Usuários.';
    }

    @Post()
    @HttpCode(201)
    createUser() {
        return 'Criar um novo usuário.';
    }
}
