import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class UpdateUserDto{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}