import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn} from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

export enum UserRole {
    Admin = 'admin',
    User = 'user'
  }

@Entity({ name: 'auth'})
export class Auth extends BaseEntity {

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.User})
    role: UserRole;

    @OneToOne(()=> User, (user) =>user.auth)
    @JoinColumn()
    user: User;

}