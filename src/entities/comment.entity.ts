import { Column, ManyToOne, Entity } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: 'comments'})
export class Comment extends BaseEntity{
    @Column()
    text: string

    @ManyToOne(()=>Post, (post)=>post.comments, {cascade: true})
    post: Post

    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    user: User
}