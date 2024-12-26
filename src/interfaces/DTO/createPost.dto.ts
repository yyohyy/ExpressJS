import { IsString,IsNotEmpty, MaxLength, IsUUID } from "class-validator";

export class CreatePostDTO{

    @IsString()
    @IsNotEmpty()
    @MaxLength(50, {message: "The title cannot exceed 50 characters."})
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsUUID()
    user: string
}