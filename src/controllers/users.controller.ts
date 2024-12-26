import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ReqValidationError } from '../errors/reqValidation.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { plainToClass } from 'class-transformer';
import { UserDetailsDTO } from '../interfaces/DTO/userDetails.dto';
import { validate } from 'class-validator';

export class UserController{

    constructor(private userService: UserService){}
    
    async register(req: Request, res: Response): Promise<void> {
            const errors= await validate(plainToClass(UserDetailsDTO, req.body))
            if (errors.length > 0){
                res.status(400).json({
                    message: 'Invalid values provided.',
                    errors: errors.map(error => ({
                        property: error.property,
                        constraints: error.constraints
                    }))
                });
            }
            const {email, password, password2, role,...userParams} = req.body
            if (req.body.password !== req.body.password2){
                throw new ReqValidationError("The password don't match.")
            }
            const auth= {email, password, role}
            const user= await this.userService.register(auth, userParams);
            if (!user){
                throw new ReqValidationError("Couldn't create an account.")
            }
            res.status(201).json({data: user, message: "User created successfully."})
    }    

    async lookup(req: Request, res: Response): Promise<void>{
            const currentUserId = req.user?.id;
            const id = req.params.id;
            if (currentUserId === id){
                const user = await this.userService.lookup(id);
                res.status(200).json({data: user});
            }         
            throw new UnauthorizedError("Not authorized to view profile.")
    }

    async viewAllUsers(req:Request, res:Response): Promise<void>{
            const userData = await this.userService.viewAllUsers();
            res.status(200).json({data: userData, message: "Successfully fetched all the users."})
    }
}

