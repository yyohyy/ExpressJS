import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/users.repository";
import { AuthRepository } from "../repository/auth.repository";
import { Encrypt } from '../helpers/helpers';
import { IAuth } from "../interfaces/auth.interface";
import { AppDataSource } from "../config/db.config";
export class UserService {

    constructor( private userRepository: UserRepository, private authRepository: AuthRepository){
        // this.userRepository = userRepository;
        // this.authRepository = authRepository;
    }

    public async register(auth: IAuth, user:User): Promise<any|null>{
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
        const authParams = {...auth, password: await Encrypt.encryptPassword(auth.password)}
        const authDetails = await this.authRepository.register(authParams);
        if (!authDetails){  
            return null
        }
        const userParams = user 
        userParams.id = authDetails.id
        const userDetails = await this.userRepository.register(userParams);
        await queryRunner.commitTransaction();
        return {...authDetails, ...userDetails}
    }catch(err){
        await queryRunner.rollbackTransaction()
        return null
    }finally{
        await queryRunner.release()
    }
    }

    public async lookup(id: string): Promise<User|null> {
        const userData = await this.userRepository.findById(id)
        return userData;
    }

    public async viewAllUsers(): Promise<User[]>{
        const users = await this.userRepository.viewAllUsers()
        return users
    }
 }
