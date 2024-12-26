import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Auth } from '../entities/auth.entity';
import { UnauthorizedError } from '../errors/unauthorized.error';

export const authMiddleware = (req: Request,res: Response, next:NextFunction) =>{
    passport.authenticate('jwt', { session: false }, (err: Error, user: Auth, info: string) => {
        if (err) {
          return res.status(500).json({ message: 'Authentication error', error: err });
        }    
        if (!user) {
          throw new UnauthorizedError("Unauthorized. Login from an account.")
        }     
        req.user = user; 
        next()
      })(req,res,next);
} 


  