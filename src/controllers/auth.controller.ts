import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ReqValidationError } from '../errors/reqValidation.error';
import { LoginDTO } from '../interfaces/DTO/login.dto';
import { Encrypt } from '../helpers/helpers';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UUID } from 'crypto';

export class AuthController{

    constructor(private authService: AuthService){}

    async login(req: Request, res: Response) : Promise<void> {
            const params: LoginDTO = req.body;
            const user = await this.authService.login(params);
            if (user === null){
                throw new ReqValidationError("There occured an error while signing in user. Please check if email and password is valid.")
            }
            res.status(201).json({data: user, message: "User successfully logged in."}) 
    }

    async refresh (req: Request, res: Response):Promise<void> {
            const refreshToken = req.body.token;
            const newTokens = await this.authService.refresh(refreshToken);
            const data = { accessToken: newTokens[0], refreshToken: newTokens[1]}
            res.status(201).json({data: data}); 
    }

    async changePassword(req: Request, res:Response):Promise<void>{                  
        const userData = await this.authService.changePassword(req.body)     
            if(userData === null){
                throw new ReqValidationError("The password provided is incorrect.")
            }    
        res.status(200).json({data: userData, success: true, message: "Password changed successfully."})
    }

    async deleteUser(req: Request, res: Response): Promise<void>{
            const password = req.body.password;
            const userID = req.params.id as UUID
            if (req.user?.id !== userID && req.user?.role !== 'admin'){
                throw new UnauthorizedError("Unauthorized. This is not your account.")
            }
            if (req.user?.role === 'user'){
                const passwordMatch = await Encrypt.comparePassword(password, req.user?.password )
                if (!passwordMatch){
                    throw new ReqValidationError("Wrong password. Enter correct password.")
                }
            }
            const data = await this.authService.deleteUser(userID)
            if (data.affected  === 0){
                throw new ReqValidationError("Not a valid request for deletion. Refresh")
            }    
            res.status(200).json({data: data, message: "Account successfully deleted."})
    }
}


