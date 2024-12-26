import { AuthRepository } from "../repository/auth.repository";
import { Auth } from "../entities/auth.entity";
import { Encrypt } from '../helpers/helpers';
import { JwtPayload } from "jsonwebtoken";
import { LoggedInDTO, LoginDTO } from "../interfaces/DTO/login.dto";
import { UUID } from "crypto";
import { ReqValidationError } from "../errors/reqValidation.error";


export class AuthService {
    constructor( 
        private authRepository: AuthRepository){
        this.authRepository = authRepository;
    }

    public async login(params: LoginDTO): Promise<LoggedInDTO|null>{
        const email = params.email;
        const AuthData = await this.authRepository.login(email);
        if (!AuthData) {
            return null;
        }       
        const passwordMatch = await Encrypt.comparePassword(params.password, AuthData.password )
        if (!passwordMatch) return null
        const [accessToken, refreshToken] = Encrypt.generateToken(AuthData)
        return {accessToken: accessToken, refreshToken: refreshToken}
    };

    async refresh(refreshToken: string): Promise<string[]>{
        const payload: JwtPayload = Encrypt.checkRefreshToken(refreshToken);
        console.log(payload)
        const user = await this.authRepository.findById(payload.userId);
        if (!user){
            return []
        }
        const tokens = Encrypt.generateToken(user);
        return tokens
    }

    async changePassword(params: any): Promise<Auth|null>{
        const user = await this.authRepository.findById(params.id) as Auth
        if (params.newPassword1 !== params.newPassword2){
            throw new ReqValidationError("The password do not match.")
        }
        const oldPassword = params.oldPassword
        const newPassword = await Encrypt.encryptPassword(params.newPassword1)   
        const passwordMatch = await Encrypt.comparePassword(oldPassword ,user.password)
        if (!passwordMatch) return null
        const userData = await this.authRepository.changePassword(params.id, newPassword)
        return userData
    }

    async deleteUser(userId: UUID){
        return await this.authRepository.deleteUser(userId);
    }
}
