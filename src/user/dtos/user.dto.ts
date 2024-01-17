/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string
}