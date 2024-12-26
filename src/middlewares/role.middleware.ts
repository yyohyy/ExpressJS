import { Request, Response, NextFunction } from "express";
import { Encrypt } from "../helpers/helpers";
import { Auth } from "../entities/auth.entity";
import { UnauthorizedError } from "../errors/unauthorized.error";

export function checkRoleMiddlware(req:Request,res:Response,next:NextFunction){

  if (!(req.user?.role === 'admin')){
    throw new UnauthorizedError("Only admin's have access to this route")
  }
  
  next()
}
  

