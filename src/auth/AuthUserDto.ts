/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
export class AuthUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string
}