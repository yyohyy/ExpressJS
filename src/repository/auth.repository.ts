import { AppDataSource } from "../config/db.config";
import {  Repository } from "typeorm";
import { Auth } from "../entities/auth.entity";


export class AuthRepository{
    private authRepository: Repository<Auth>;
    constructor(){
        this.authRepository = AppDataSource.getRepository(Auth);
    }

    async register(params: any): Promise<Auth|null>{
        return await this.authRepository.save(params);
    }

    public async login(email: string):Promise<Auth|null>{
        return this.authRepository.findOne({where: {email}})
    }

    public async findById(id: string){
        return this.authRepository.findOne({where: {id}});
    }

    async changePassword(id: string, newPassword: string){
        const user = await this.authRepository.findOne({where: {id}})
        if (!user){
            return null
        }
        user.password = newPassword;
        return await this.authRepository.save(user)
    }

    async deleteUser(userId: string){
        return await this.authRepository.delete(userId)
    }
}

