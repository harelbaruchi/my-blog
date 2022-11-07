import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto{
    id?: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}