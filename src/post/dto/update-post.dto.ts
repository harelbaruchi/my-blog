import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    status: string
}