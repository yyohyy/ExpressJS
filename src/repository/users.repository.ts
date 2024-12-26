import { AppDataSource } from "../config/db.config";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


export class UserRepository{
    private userRepository: Repository<User>;
    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async register(params: User): Promise<User>{
        return await this.userRepository.save(params);
    }

    public async findById(id: string):Promise<User| null>{
        return this.userRepository.findOne({where: {id: id}});
    }

    async viewAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find();
        return users;
    }
};