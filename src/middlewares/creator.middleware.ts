import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

export function ownerMiddleware(req : Request, res : Response, next : NextFunction){
 
  if (req.user?.id !== req.params.userId){
    throw new UnauthorizedError("Only owner can access this endpoint.")
  }
  next()
}
  