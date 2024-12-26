import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { UserDetailsDTO } from '../interfaces/DTO/userDetails.dto';
import { LoginDTO } from '../interfaces/DTO/login.dto';

export const loginValidator = async(req: Request,res: any, next: NextFunction) =>{
    try{
        if(!req.body){
            return res.status(400).json({ message: "Missing request body" })
        }
        const user = new LoginDTO();
        user.email = req.body.email
        user.password = req.body.password
        await validateOrReject(user)
        next()
    } catch(err:any){
        res.status(400).json(err[0].constraints);
    }
}
export const createUserValidator = async(req: any, res: any, next: NextFunction) => {
    try{
        if(!req.body){
            return res.status(400).json({ message: "Missing request body" })
        }
        const user = new UserDetailsDTO();
        user.email = req.body.email
        user.password = req.body.password
        user.role = req.body.role
        //user.phoneNo = req.body.phoneNo
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        await validateOrReject(user)
        next()
    } catch(err:any){
        res.status(400).json(err[0]);
    }
}

