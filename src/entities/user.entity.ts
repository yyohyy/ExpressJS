import { Entity, Column, OneToMany, OneToOne} from 'typeorm';
import { Auth } from './auth.entity';
import { Post } from './post.entity';
import { PostLike } from './like.entity';
import { Comment } from './comment.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users'})
export class User extends BaseEntity {

    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: true})
    phoneNo: number;

    @OneToOne(()=>Auth, (auth) => auth.user, {cascade: true})
    auth: Auth;

    @OneToMany(()=> Post, (post) =>post.user)
    post: Post[]

    @OneToMany(() => PostLike, (like) => like.user)
    likes: PostLike[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}