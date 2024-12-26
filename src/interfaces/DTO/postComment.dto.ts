import { IsString, MinLength } from "class-validator";

export class PostCommentDTO{
    @IsString()
    @MinLength(1)
    text: string
}