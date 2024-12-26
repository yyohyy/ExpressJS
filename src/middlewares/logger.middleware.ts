import { NextFunction } from "express";

export const loggerMiddleware = (req: any , res:any, next:NextFunction) => {
    req.time = new Date(Date.now()).toString();
    
    console.log(req.method, req.url, req.time)
    next();
}