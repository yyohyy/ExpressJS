import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { Auth } from '../entities/auth.entity';

const JWT_SECRET_ACCESS = String(envConfig.JWT_SECRET_ACCESS);
const JWT_SECRET_REFRESH = String(envConfig.JWT_SECRET_REFRESH);

export class Encrypt{
    static async encryptPassword(password: string){
        return bcrypt.hashSync(password, 12);
    }

    static async comparePassword(password: string, actualPassword: string){
        return bcrypt.compare(password, actualPassword)
    }

    static generateToken(userData: Auth){
        const accessToken = jwt.sign({userId: userData.id, role: userData.role}, JWT_SECRET_ACCESS, {expiresIn: '24h'}); 
        const refreshToken = jwt.sign({userId: userData.id, role: userData.role}, JWT_SECRET_REFRESH, {expiresIn: '24h'})
        return [accessToken, refreshToken];
    }   

    static checkRefreshToken(refreshToken: string): jwt.JwtPayload{
        const user = jwt.verify(refreshToken, JWT_SECRET_REFRESH)
        return user as jwt.JwtPayload;
    }

    static verifyToken(token: any){
        return jwt.verify(token, JWT_SECRET_ACCESS);
    }
}