import { Post } from "./post.entity"
import { ManyToOne, Entity } from "typeorm"
import { User } from "./user.entity"
import { BaseEntity } from "./base.entity"

@Entity({name: 'likes'})
export class PostLike extends BaseEntity{

    @ManyToOne(()=>Post, (post)=>post.likes, {cascade: true})
    
    post: Post
    @ManyToOne(() => User, (user) => user.likes, { eager: true })
    user: User;    
}