import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto{

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    authorId: number;
    
}