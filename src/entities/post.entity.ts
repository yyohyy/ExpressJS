import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { PostLike } from './like.entity';
import { Comment } from './comment.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'posts'})
export class Post extends BaseEntity {

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    content: string;

    @ManyToOne(() => User, (user) => user.post,{cascade: true, eager: true})
    @JoinColumn()
    user: User

    @OneToMany(()=>Comment, (comment) =>comment.post, {eager: true})
    comments: Comment[]

    @OneToMany(()=> PostLike, (like)=>like.post, {eager: true})
    likes: PostLike[]
}