import { IsNotEmpty, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

export class UserDisplayDTO{
    @Expose()
    firstName: string

    @Expose()
    lastName: string
}

export class CommentDisplayDTO{
    @Expose()  
    @ValidateNested()
    @Type(() => UserDisplayDTO)
    user: UserDisplayDTO

    @Expose()
    text: string

    @Expose()
    updatedAt: Date
}

export class LikeDisplayDTO{
    @Expose()  
    @ValidateNested()
    @Type(() => UserDisplayDTO)
    user: UserDisplayDTO

    @Expose()
    createdAt: Date
}

export class ViewPostDTO{

    @IsNotEmpty()
    @Expose()
    content: string

    @Expose()
    updatedAt: Date

    @Expose()  
    @ValidateNested()
    @Type(() => UserDisplayDTO)
    user: UserDisplayDTO

    @Expose()    
    @ValidateNested({each: true})
    @Type(() => CommentDisplayDTO)
    comments:  CommentDisplayDTO[]

    @Expose()  
    @ValidateNested({each: true})
    @Type(() => LikeDisplayDTO)
    likes: LikeDisplayDTO[]

    @Expose()
    likesCount: number

    @Expose()
    commentsCount: number
}
